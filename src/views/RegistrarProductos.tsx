import {
  Form,
  ActionFunctionArgs,
  useActionData,
  redirect,
} from "react-router-dom";
import ErrorMsj from "../components/ErrorMsj";
import { agregarProducto } from "../services/ProductoService";
import ProductoForm from "../components/ProductoForm";

export async function action({ request }: ActionFunctionArgs) {
  console.log(request)
  const data = Object.fromEntries(await request.formData());
    console.log(data);

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  //para mostrar el error en el componente
  if (error.length) {
    return error;
  }

  // agregando productos a la base de datos - llama a la función que está en el service y le pasa los datos
  await agregarProducto(data);

  return redirect("/"); // redirect es de react router dom que permite redireccionar a la ruta seleccionada
}

const RegistrarProductos = () => {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl  text-blue-950 ">
          Registrar Productos
        </h2>
      </div>
      {error && <ErrorMsj>{error}</ErrorMsj>}
      <Form method="POST" className="mx-auto mt-10 max-w-4xl">
        <ProductoForm />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

export default RegistrarProductos;
