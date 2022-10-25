import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import UserService from "../../src/services/UserService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";

function NewUser() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertUser = (user) => {
    UserService.create(user).then((data) => {
      router.push(ROUTES.users.list)
      toast.success(`User successfully created!`)
    }).catch((e) => console.error(e))
  }

  return (
    <>
      <p>Tela de Cadastro de Usuário</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.users.list,
          }}
        >
          <Button variant="contained" color="error" size="small" startIcon={<ArrowBackIcon fontSize="small" />}>Voltar</Button>
          
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertUser(data))}>
        <div className="field">
          <label>Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <p>name is required.</p>}
        </div>

        <div className="field">
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <p>email is required.</p>}
        </div>

        <Button type="submit" variant="contained" color="success" size="small" startIcon={<SendIcon fontSize="small"/>}>
          Enviar
        </Button>
      </form>
    </>
  );
}

export default NewUser;
