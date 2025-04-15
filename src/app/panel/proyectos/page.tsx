import DataTable from '@/app/components/Table/DataTable'
import styles from "./proyectos.module.css";

const dummyData = [
  { id: '1', col1: 'Proyecto A', col2: 'Activo', col3: 'Carlos', col4: '2024-01-01' },
  { id: '2', col1: 'Proyecto B', col2: 'Pendiente', col3: 'Lucía', col4: '2024-03-15' },
  { id: '3', col1: 'Proyecto C', col2: 'Completado', col3: 'Diego', col4: '2023-12-10' },
  { id: '4', col1: 'Proyecto D', col2: 'Activo', col3: 'María', col4: '2024-04-01' },
];

export default function Proyectos() {
  return (
    <div className={styles.proyectosdContent}>
      <h1>Proyectos</h1>
      <DataTable data={dummyData} />
    </div>
  );
}
