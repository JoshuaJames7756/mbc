// src/pages/Admin.jsx
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';
import ProductoTable from '../components/admin/ProductoTable';
import styles from './Admin.module.css';

export default function Admin() {
  return (
    <div className={styles.admin}>
      <SignedOut>
        <div className={styles.loginWrap}>
          <SignIn routing="hash" />
        </div>
      </SignedOut>

      <SignedIn>
        <header className={styles.header}>
          <h1>Panel MBC</h1>
          <UserButton afterSignOutUrl="/admin" />
        </header>
        <main className={styles.main}>
          <ProductoTable />
        </main>
      </SignedIn>
    </div>
  );
}