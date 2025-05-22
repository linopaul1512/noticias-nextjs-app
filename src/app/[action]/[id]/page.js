//import AddProduct from "@/app/components/add-product";
//import DeleteProduct from "@/app/components/delete-product";
//import EditProduct from "@/app/components/edit-product";
import ViewUsuario from "@/app/components/view-usuario";
import React from "react";

const ActionUsuarioId = ({ params }) => {
  const { action, id } = params;
  switch (action) {
    /*case "add":
      return <AddProduct />;
    case "edit":
      return <EditProduct id={id} />;*/
    case "view":
      return <ViewUsuario id={id} />;
  }
};

export default ActionUsuarioId;
