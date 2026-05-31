/**
 * @fileoverview The 22 Hebrew letters (Aleph..Tav) as flash-card entries.
 * Samekh references a second Malachim form via `variantGlyphId`.
 */

import type { LetterCard } from '../types/card';

export const LETTERS: readonly LetterCard[] = [
  { id: 'aleph', order: 1, name: 'Aleph', hebrewChar: 'א', glyphId: 'aleph' },
  { id: 'beth', order: 2, name: 'Beth', hebrewChar: 'ב', glyphId: 'beth' },
  { id: 'gimel', order: 3, name: 'Gimel', hebrewChar: 'ג', glyphId: 'gimel' },
  {
    id: 'daleth',
    order: 4,
    name: 'Daleth',
    hebrewChar: 'ד',
    glyphId: 'daleth',
  },
  { id: 'heh', order: 5, name: 'Heh', hebrewChar: 'ה', glyphId: 'heh' },
  { id: 'vav', order: 6, name: 'Vav', hebrewChar: 'ו', glyphId: 'vav' },
  { id: 'zayin', order: 7, name: 'Zayin', hebrewChar: 'ז', glyphId: 'zayin' },
  { id: 'cheth', order: 8, name: 'Cheth', hebrewChar: 'ח', glyphId: 'cheth' },
  { id: 'teth', order: 9, name: 'Teth', hebrewChar: 'ט', glyphId: 'teth' },
  { id: 'yod', order: 10, name: 'Yod', hebrewChar: 'י', glyphId: 'yod' },
  { id: 'kaph', order: 11, name: 'Kaph', hebrewChar: 'כ', glyphId: 'kaph' },
  { id: 'lamed', order: 12, name: 'Lamed', hebrewChar: 'ל', glyphId: 'lamed' },
  { id: 'mem', order: 13, name: 'Mem', hebrewChar: 'מ', glyphId: 'mem' },
  { id: 'nun', order: 14, name: 'Nun', hebrewChar: 'נ', glyphId: 'nun' },
  {
    id: 'samekh',
    order: 15,
    name: 'Samekh',
    hebrewChar: 'ס',
    glyphId: 'samekh',
    variantGlyphId: 'samekh-var',
    note: 'Two attested Malachim forms.',
  },
  { id: 'ayin', order: 16, name: 'Ayin', hebrewChar: 'ע', glyphId: 'ayin' },
  { id: 'peh', order: 17, name: 'Peh', hebrewChar: 'פ', glyphId: 'peh' },
  {
    id: 'tzaddi',
    order: 18,
    name: 'Tzaddi',
    hebrewChar: 'צ',
    glyphId: 'tzaddi',
  },
  { id: 'qoph', order: 19, name: 'Qoph', hebrewChar: 'ק', glyphId: 'qoph' },
  { id: 'resh', order: 20, name: 'Resh', hebrewChar: 'ר', glyphId: 'resh' },
  { id: 'shin', order: 21, name: 'Shin', hebrewChar: 'ש', glyphId: 'shin' },
  { id: 'tav', order: 22, name: 'Tav', hebrewChar: 'ת', glyphId: 'tav' },
] as const;
