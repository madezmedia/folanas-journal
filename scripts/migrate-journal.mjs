import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const journalsDirectory = path.join(process.cwd(), 'journal-entries');

async function migrate() {
  if (!fs.existsSync(journalsDirectory)) {
    console.log('No local entries to migrate.');
    return;
  }

  const fileNames = fs.readdirSync(journalsDirectory);
  console.log(`Found ${fileNames.length} entries to migrate...`);

  for (const fileName of fileNames) {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(journalsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const dateVal = matterResult.data.date || matterResult.data.timestamp;
    const date = dateVal ? (dateVal instanceof Date ? dateVal.toISOString() : String(dateVal)) : new Date().toISOString();
    const title = matterResult.data.title || matterResult.data.type || 'Untitled';

    console.log(`Migrating: ${title} (${id})...`);

    const { error } = await supabase
      .from('journal_entries')
      .upsert({
        id,
        title,
        date: date.split('T')[0],
        content: contentHtml
      });

    if (error) {
      console.error(`❌ Error migrating ${id}:`, error);
    } else {
      console.log(`✅ Success: ${id}`);
    }
  }

  console.log('Migration complete.');
}

migrate();
