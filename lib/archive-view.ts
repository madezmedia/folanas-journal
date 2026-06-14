import { buildUnifiedArchive, filterByArc, searchArchive, type ArchiveItem, type ArchiveItemType } from './archive';

export const ARCHIVE_PAGE_SIZE = 12;
export const ARCHIVE_FRESH_COUNT = 4;
export const ARCHIVE_PAGE_WINDOW = 5;

export type ArchiveBrowseTypeFilter = ArchiveItemType | 'all';

export interface ArchiveBrowseQuery {
  q: string;
  type: ArchiveBrowseTypeFilter;
  arc: string;
  page: number;
  id: string;
}

export interface ArchivePagination {
  currentPage: number;
  totalPages: number;
  pageStart: number;
  pageEnd: number;
  pageItems: ArchiveItem[];
  pageWindow: number[];
}

export function getFreshArchiveItems(count = ARCHIVE_FRESH_COUNT): ArchiveItem[] {
  return buildUnifiedArchive().slice(0, count);
}

export function parseArchiveBrowseQuery(params: URLSearchParams): ArchiveBrowseQuery {
  const type = params.get('type');
  const page = Number.parseInt(params.get('page') ?? '1', 10);

  return {
    q: params.get('q') ?? '',
    type: type === 'music-audio' || type === 'music-video' || type === 'visual-codex' || type === 'prototype' ? type : 'all',
    arc: params.get('arc') ?? '',
    page: Number.isFinite(page) && page > 0 ? page : 1,
    id: params.get('id') ?? '',
  };
}

export function getFilteredArchiveItems(query: Pick<ArchiveBrowseQuery, 'q' | 'type' | 'arc'>, allItems: ArchiveItem[] = buildUnifiedArchive()): ArchiveItem[] {
  let items = query.q ? searchArchive(query.q) : allItems;

  if (query.type !== 'all') {
    items = items.filter(item => item.type === query.type);
  }

  if (query.arc) {
    const arcMatches = new Set(filterByArc(query.arc).map(item => item.id));
    items = items.filter(item => arcMatches.has(item.id));
  }

  return items;
}

export function getArchivePagination(items: ArchiveItem[], page: number, pageSize = ARCHIVE_PAGE_SIZE): ArchivePagination {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pageItems = items.slice(pageStart, pageEnd);
  const pageWindow = getArchivePageWindow(currentPage, totalPages);

  return { currentPage, totalPages, pageStart, pageEnd, pageItems, pageWindow };
}

export function getArchivePageWindow(currentPage: number, totalPages: number, width = ARCHIVE_PAGE_WINDOW): number[] {
  if (totalPages <= width) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + width - 1);

  if (end - start + 1 < width) {
    start = Math.max(1, end - width + 1);
  }

  return Array.from({ length: Math.min(totalPages - start + 1, width) }, (_, index) => start + index);
}
