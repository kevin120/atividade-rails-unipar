import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import CategoryService from "../../src/services/CategoryService";

function NewCategory() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertCategory = (category) => {
    CategoryService.create(category).then((data) => {
      router.push(ROUTES.categories.list)
      toast.success(`Category successfully created!`)
    }).catch((e) => console.error(e))
  }


  return (
    <>
      <p>Tela de Cadastro de Categoria</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.categories.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertCategory(data))}>
        
        <div className="field">
          <label>Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <p>name is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default NewCategory;
