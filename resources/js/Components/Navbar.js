import NavLink from "@/Components/NavLink";
import NavLinkSub from "@/Components/NavLinkSub";
import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Navbar(props) {
  const navs = [
    {
      href: "pegawai",
      src: "pegawai.svg",
      text: "Pegawai",
      render: (
        <NavLinkSub
          title="Pegawai"
          menus={[
            { href: "pegawai", text: "Data Pegawai" },
            { href: "pegawai.create", text: "Tambah Pegawai" },
          ]}
        />
      ),
    },
    {
      href: "layanan",
      src: "layanan.svg",
      text: "Layanan",
      render: (
        <NavLinkSub
          title="Layanan"
          menus={[
            { href: "layanan", text: "Data Layanan" },
            { href: "layanan.create", text: "Tambah Layanan" },
          ]}
        />
      ),
    },
    {
      href: "antrian",
      src: "antrian.svg",
      text: "Antrian",
      render: (
        <NavLinkSub
          title="Antrian"
          menus={[
            {
              href: "antrian",
              text: "Ambil Antrian",
              condition: ["admin", "antrian"].includes(props.auth.peran),
            },
            {
              href: "antrian.list",
              text: "Antrian Pendaftaran",
              condition: ["admin", "pendaftaran"].includes(props.auth.peran),
            },
            {
              href: "antrian.medis",
              text: "Antrian Medis",
              condition: ["admin", "medis"].includes(props.auth.peran),
            },
            {
              href: "antrian.resep",
              text: "Antrian Resep",
              condition: ["admin", "apoteker"].includes(props.auth.peran),
            },
          ]}
        />
      ),
    },
    {
      href: "pasien",
      src: "pasien.svg",
      text: "Pasien",
      render: (
        <NavLinkSub
          title="Pasien"
          menus={[
            {
              href: "pasien",
              text: "Data Pasien",
              condition: ["admin", "pendaftaran"].includes(props.auth.peran),
            },
            {
              href: "pasien.create",
              text: "Tambah Pasien",
              condition: ["admin", "pendaftaran"].includes(props.auth.peran),
            },
          ]}
        />
      ),
    },
    {
      href: "kunjungan",
      src: "kunjungan.svg",
      text: "Kunjungan",
      render: (
        <NavLinkSub
          title="Kunjungan"
          menus={[
            { href: "kunjungan", text: "Data Kunjungan" },
            { href: "kunjungan.create", text: "Tambah Kunjungan" },
            { href: "kunjungan.createLaporan", text: "Rekap Data" },
          ]}
        />
      ),
    },
    {
      href: "pemeriksaan",
      src: "rekam_medis.svg",
      text: "Rekam Medis",
      render: (
        <NavLinkSub
          title="Rekam Medis"
          menus={[{ href: "pemeriksaan", text: "Data Pemeriksaan" }]}
        />
      ),
    },
    {
      href: "pembayaran",
      src: "pembayaran.svg",
      text: "Pembayaran",
      render: (
        <NavLinkSub
          title="Pembayaran"
          menus={[
            { href: "pembayaran", text: "Belum Dibayarkan" },
            { href: "pembayaran.lunas", text: "Data Pembayaran" },
          ]}
        />
      ),
    },
    {
      href: "obat",
      src: "obat.svg",
      text: "Obat",
      render: (
        <NavLinkSub
          title="Obat"
          menus={[
            { href: "obat", text: "Data Obat" },
            { href: "obat.create", text: "Tambah Obat" },
          ]}
        />
      ),
    },
    {
      href: "profil",
      src: "profile-white.svg",
      text: "Profil",
      render: (
        <NavLinkSub
          title="Profil"
          menus={[{ href: "profil", text: "Data Pengguna" }]}
        />
      ),
    },
    {
      href: "jadwal.create",
      check: "pengaturan",
      src: "cogwheel.svg",
      text: "Pengaturan",
      render: (
        <NavLinkSub
          title="Pengaturan"
          menus={[
            { href: "jadwal.create", text: "Data Jadwal" },
            { href: "kontak.create", text: "Data Kontak" },
          ]}
        />
      ),
    },
  ];
  const userAccess = {
    admin: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    antrian: [2, 8],
    pendaftaran: [2, 3, 4, 8],
    medis: [2, 5, 8],
    pembayaran: [6, 8],
    apoteker: [2, 7, 8],
  };

  const submenus = () => {
    const selected = navs.find((n) =>
      window.location.href.includes(n.check || n.href)
    );
    return selected && selected.render ? selected.render : <> </>;
  };

  return (
    <nav className="bg-primary text-white border-b border-gray-100 fixed min-h-screen nav">
      <section className="flex flex-col gap-2 justify-start items-start z-10 pt-4">
        {navs.map(
          (n, i) =>
            userAccess[props.auth.peran].includes(i) && (
              <NavLink
                href={n.href}
                check={n.check}
                src={n.src}
                text={n.text}
                key={n.text}
                extra
              ></NavLink>
            )
        )}

        <InertiaLink
          href={route("logout")}
          method="post"
          as="button"
          className="nav-item flex gap-4 items-center w-full text-xs "
        >
          <img src={`/assets/logout.svg`} className="nav-img" />
          <span>Keluar</span>
        </InertiaLink>
      </section>

      <section className="bg-black pt-4">{submenus()}</section>
    </nav>
  );
}
