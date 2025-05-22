"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/app/components/bread-crumb";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const breadCrumb = [
  { title: "Home", url: "../" },
  { title: "View Usuario", url: "../view/" },
];

const ViewUsuario = ({ id }) => {
  const { register } = useForm({
    defaultValues: async () => {
      const { usuario } = await getUsuario(id);
      return usuario;
    },
  });

  const getUsuario = async (id) => {
    try {
      const res = await fetch(`../api/${id}`);
      if (!res.ok) {
        throw new Error("Failed to get user");
      }

      return await res.json();
    } catch (error) {
      alert("Failed to get user");
    }
  };

  return (
    <div>
      <BreadCrumb lists={breadCrumb} />
      <h4 className="mb-2">Viasualizar Usuario</h4>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6">
            <form method="POST">
              <div className="mb-3">
                <label htmlFor="Nombre" className="form-label">
                  Nombre
                </label>
                <input
                  className="form-control"
                  {...register("Nombre", {
                    disabled: true,
                  })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Apellido" className="form-label">
                  Apellido
                </label>
                <input
                  className="form-control"
                  {...register("Apellido", { disabled: true })}
                ></input>
              </div>
              <div className="mb-3">
                <label htmlFor="NombreUsuario" className="form-label">
                  Nombre de Usuaurio
                </label>
                <input
                  className="form-control"
                  {...register("NombreUsuario", { disabled: true })}
                />
                </div>
                <div className="mb-3">
                  <label htmlFor="Tipo" className="form-label">
                    Tipo
                  </label>
                  <input
                    className="form-control"
                    {...register("Tipo", { disabled: true })}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="Correo" className="form-label">
                    Correo
                  </label>
                  <input
                    className="form-control"
                    {...register("Correo", { disabled: true })}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="Telefono" className="form-label">
                    Telefono
                  </label>
                  <input
                    className="form-control"
                    {...register("Telefono", { disabled: true })}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="Contrasena" className="form-label">
                    Contraseña
                  </label>
                  <input
                    className="form-control"
                    {...register("Contrasena", { disabled: true })}
                  ></input>
                </div>
                


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUsuario;
