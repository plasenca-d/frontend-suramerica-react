import React from 'react';
import styles from './LoginPage.module.css'; // Importa el archivo CSS como módulo
import { FormLogin } from '../components/FormLogin';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <FormLogin />
    </div>
  );
}
