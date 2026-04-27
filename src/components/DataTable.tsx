// src/components/DataTable.tsx
// Componente genérico de tabla de datos.
// Acepta cualquier tipo de dato T y las columnas que debe mostrar.

import { useState } from 'react';

// ── Tipos del componente ────────────────────────────────────

/**
 * Define una columna de la tabla.
 * 'key' debe ser una clave válida de T.
 */
interface Columna<T> {
  key: keyof T;
  titulo: string;
}

/**
 * Props del componente DataTable.
 * Usa genérico T para ser compatible con cualquier tipo de dato.
 */
interface DataTableProps<T extends { id: string | number }> {
  datos: T[];
  columnas: Columna<T>[];
  titulo?: string;
}

// ── Componente ──────────────────────────────────────────────

/**
 * Tabla de datos genérica y fuertemente tipada.
 * Permite editar filas usando Partial<T> para el estado temporal.
 */
export function DataTable<T extends { id: string | number }>({
  datos,
  columnas,
  titulo,
}: DataTableProps<T>) {
  // Partial<T>: el estado de edición puede tener solo algunos campos
  // ya que el usuario podría no haber rellenado todos aún.
  const [filaEditando, setFilaEditando] = useState<string | number | null>(null);
  const [edicionTemporal, setEdicionTemporal] = useState<Partial<T>>({});

  function iniciarEdicion(fila: T) {
    setFilaEditando(fila.id);
    setEdicionTemporal({ ...fila });
  }

  function guardarEdicion() {
    // Aquí se enviaría la edición al servidor
    console.log('Guardando edición:', edicionTemporal);
    setFilaEditando(null);
    setEdicionTemporal({});
  }

  function cancelarEdicion() {
    setFilaEditando(null);
    setEdicionTemporal({});
  }

  return (
    <div style={{ fontFamily: 'sans-serif', margin: '1rem' }}>
      {titulo && <h2 style={{ marginBottom: '0.5rem' }}>{titulo}</h2>}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#c8f135', color: '#000' }}>
            {columnas.map((col) => (
              <th key={String(col.key)} style={{ padding: '0.5rem 1rem', textAlign: 'left' }}>
                {col.titulo}
              </th>
            ))}
            <th style={{ padding: '0.5rem 1rem' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id} style={{ borderBottom: '1px solid #ddd' }}>
              {columnas.map((col) => (
                <td key={String(col.key)} style={{ padding: '0.5rem 1rem' }}>
                  {filaEditando === fila.id ? (
                    <input
                      value={String(edicionTemporal[col.key] ?? '')}
                      onChange={(e) =>
                        setEdicionTemporal((prev) => ({
                          ...prev,
                          [col.key]: e.target.value,
                        }))
                      }
                      style={{ border: '1px solid #c8f135', padding: '0.2rem', borderRadius: '4px' }}
                    />
                  ) : (
                    String(fila[col.key])
                  )}
                </td>
              ))}
              <td style={{ padding: '0.5rem 1rem' }}>
                {filaEditando === fila.id ? (
                  <>
                    <button onClick={guardarEdicion} style={{ marginRight: '0.5rem', cursor: 'pointer' }}>
                      ✅ Guardar
                    </button>
                    <button onClick={cancelarEdicion} style={{ cursor: 'pointer' }}>
                      ❌ Cancelar
                    </button>
                  </>
                ) : (
                  <button onClick={() => iniciarEdicion(fila)} style={{ cursor: 'pointer' }}>
                    ✏️ Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
