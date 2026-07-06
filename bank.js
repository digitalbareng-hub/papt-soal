import { HARD } from './bank-hard.js';
import { MEDIUM } from './bank-medium.js';
import { BASIC } from './bank-basic.js';

export const RULES = {
  SULIT: { label: 'Sulit', take: 20, correct: 3.5, wrong: -0.677777 },
  MUDAH: { label: 'Mudah', take: 30, correct: 2.333333, wrong: -0.333333 },
  SANGAT_MUDAH: { label: 'Sangat Mudah', take: 50, correct: 1, wrong: -0.133333 }
};

function mapRows(rows) {
  return rows.map(([category, module, question, options, explanation]) => ({
    category,
    module,
    question,
    options,
    answerIndex: 0,
    explanation
  }));
}

export const QUESTIONS = mapRows([...HARD, ...MEDIUM, ...BASIC]);
