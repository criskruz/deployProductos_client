import {
  Form,
  ActionFunctionArgs,
  useActionData,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import {
  actualizarProducto,
  obtenerProductoId,
} from "../services/ProductoService";
import ErrorMsj from "../components/ErrorMsj";
import { Producto } from "../types";
import ProductoForm from "../components/ProductoForm";

// este loader permite recuperar el id desde la url
export async function loader({ params }: LoaderFunctionArgs) {
  // console.log(params.id);
  if (params.id !== undefined) {
    const producto = await obtenerProductoId(+params.id);
    if (!producto) {
      return redirect("/");
    }
    return producto;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  // toma los datos y el id
  const data = Object.fromEntries(await request.formData());
  //   recupera los datos que el usuario cargo en el formulario, los datos actualizados

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
    //   console.log(error);
  }
  //para mostrar el error en el componente
  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    await actualizarProducto(data, +params.id);
    return redirect("/");
  }
}

//Para agregar campo disponibilidad
const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

// Componente
const EditarProductos = () => {
  const producto = useLoaderData() as Producto;
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between ">
        <h2 className="text-4xl  text-blue-950 ">Editar Productos</h2>
      </div>
      {error && <ErrorMsj>{error}</ErrorMsj>}
      <Form method="POST" className="mx-auto mt-10 max-w-4xl">
        <ProductoForm producto={producto} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={producto?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Actualizar Producto"
        />
      </Form>
    </>
  );
};

export default EditarProductos;
