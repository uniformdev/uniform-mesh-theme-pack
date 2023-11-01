import { Theme } from '../types/common';

export const deepEqual = (obj1?: Theme, obj2?: Theme) => JSON.stringify(obj1) === JSON.stringify(obj2);
