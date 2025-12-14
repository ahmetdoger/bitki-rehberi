'use client'; // Bu satır, bileşenin tarayıcıda çalışacağını belirtir.

import { useEffect } from "react";

/**
 * Bootstrap'in JavaScript bileşenlerini (Carousel, Offcanvas, vb.) çalıştırır.
 */
export default function BootstrapClient() {
  useEffect(() => {
    // Sadece tarayıcıda (mount olduğunda) import et.
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return null;
}