"use lector";
import React, { useEffect, useState } from "react";
import DataTable from "@/app/components/dataTable";

const cols = ["Id", "Nombre", "Apellido", "NombreUsuario", "Tipo", "Correo", "Telefono", "Contrasena" ];

const AllUsuarios = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function getAllUsuarios() {
      try {
        const res = await fetch("/api/");
        if (!res.ok) {
          throw new Error("Error fetching users");
        }

        const { usuarios } = await res.json();
        setRows(usuarios);
      } catch (error) {
        console.log("Error fetching users");
      }
    }
    getAllUsuarios();
  }, []);
  return <DataTable cols={cols} rows={rows} />;
};

export default AllUsuarios;
