// src/utils/dateUtils.ts
// Utilidades de fechas usando date-fns con tipos estrictos.

import { differenceInDays } from 'date-fns';

/**
 * Calcula la diferencia en días entre dos fechas.
 * @param fechaInicio - Fecha de inicio.
 * @param fechaFin - Fecha de fin.
 * @returns Número de días entre las dos fechas (valor absoluto).
 */
export function calcularDiferenciaEnDias(fechaInicio: Date, fechaFin: Date): number {
  return Math.abs(differenceInDays(fechaFin, fechaInicio));
}
