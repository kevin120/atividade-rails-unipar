import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import UserService from "../../../src/services/UserService";

function EditUser() {

  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getById(id).then((data) => {
      setUser(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateUser = (user) => {
    UserService.update(id, user).then((data) => {
      router.push(ROUTES.users.list)
      toast.success(`User successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating user: ${e.message}`)
    })
  }

  if (!user) return `Carregando...`

  return (
    <>
      <p>Página de Edição do Usuário: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.users.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateUser(data))}>
        <div className="field">
          <label>Name</label>
          <input {...register("name", { required: true })} defaultValue={user.name} />
          {errors.name && <p>name is required.</p>}
        </div>

        <div className="field">
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} defaultValue={user.email} />
          {errors.email && <p>email is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditUser;
