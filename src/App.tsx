// src/App.tsx
// Punto de entrada de la aplicación React.
// Demuestra el uso del componente DataTable genérico y las utilidades de fechas.

import { DataTable } from './components/DataTable';
import { calcularDiferenciaEnDias } from './utils/dateUtils';

// ── Tipos de datos de ejemplo ───────────────────────────────
interface Estudiante {
  id: number;
  nombreCompleto: string;
  email: string;
  carrera: string;
}

interface Asignatura {
  id: number;
  nombre: string;
  creditos: number;
  departamento: string;
}

// ── Datos de ejemplo ────────────────────────────────────────
const estudiantes: Estudiante[] = [
  { id: 1, nombreCompleto: 'Ana García', email: 'ana@universidad.es', carrera: 'Informática' },
  { id: 2, nombreCompleto: 'Luis Martínez', email: 'luis@universidad.es', carrera: 'Matemáticas' },
  { id: 3, nombreCompleto: 'Sara López', email: 'sara@universidad.es', carrera: 'Física' },
];

const asignaturas: Asignatura[] = [
  { id: 1, nombre: 'Programación Web', creditos: 6, departamento: 'Informática' },
  { id: 2, nombre: 'Bases de Datos', creditos: 6, departamento: 'Informática' },
  { id: 3, nombre: 'Cálculo I', creditos: 9, departamento: 'Matemáticas' },
];

// ── Columnas para cada tabla ────────────────────────────────
const columnasEstudiantes = [
  { key: 'nombreCompleto' as const, titulo: 'Nombre' },
  { key: 'email' as const, titulo: 'Email' },
  { key: 'carrera' as const, titulo: 'Carrera' },
];

const columnasAsignaturas = [
  { key: 'nombre' as const, titulo: 'Asignatura' },
  { key: 'creditos' as const, titulo: 'Créditos' },
  { key: 'departamento' as const, titulo: 'Departamento' },
];

// ── Componente principal ────────────────────────────────────
function App() {
  const diasDesdeInicioCurso = calcularDiferenciaEnDias(
    new Date('2025-09-01'),
    new Date()
  );

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontFamily: 'sans-serif' }}>
        🎓 Sistema Universitario
      </h1>
      <p style={{ fontFamily: 'sans-serif', color: '#666' }}>
        Han pasado <strong>{diasDesdeInicioCurso} días</strong> desde el inicio del curso.
      </p>

      <DataTable<Estudiante>
        titulo="📋 Estudiantes"
        datos={estudiantes}
        columnas={columnasEstudiantes}
      />

      <DataTable<Asignatura>
        titulo="📚 Asignaturas"
        datos={asignaturas}
        columnas={columnasAsignaturas}
      />
    </div>
  );
}

export default App;
