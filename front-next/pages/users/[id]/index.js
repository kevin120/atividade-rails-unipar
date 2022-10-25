import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import UserService from "../../../src/services/UserService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

function ShowUser() {
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getById(id).then((data) => {
      setUser(data)
    })
  }, [id])

  if (!user) return `Carregando...`

  return (
    <>
      <p>Exibindo o usuario: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.users.list,
          }}
        >
          <Button variant="contained" color="error" size="small" startIcon={<ArrowBackIcon fontSize="small" />}>Voltar</Button>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{user.id}</dd>

        <dt>Name</dt>
        <dd>{user.name}</dd>

        <dt>Email</dt>
        <dd>{user.email}</dd>

        <dt>Created At</dt>
        <dd>{user.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowUser;