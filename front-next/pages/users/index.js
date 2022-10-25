import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libs
import { Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import UserService from "../../src/services/UserService";
import { Container } from "@mui/system";

function UserList() {
  const { router } = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteUser = (user) => {
    var accepted = confirm(`Você realmente gostaria de deletar o Usuário: ${user.name}`);
    if (!accepted) return;

    setIsLoading(true);
    UserService.destroy(user.id)
      .then((data) => {
        getUsers().then(() => {
          setIsLoading(false);
          toast.success("User destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying user: ${e.message}`);
      });
  };

  const getUsers = async () => {
    let data = await UserService.getAll();
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    getUsers().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>

      <div class="topnav">
        <p>
          <Link
            href={{
              pathname: ROUTES.articles.list,
            }}
          >
            <a>Articles</a>
          </Link>
        </p>

        <p>
          <Link
            href={{
              pathname: ROUTES.categories.list,
            }}
          >
            <a>Categories</a>
          </Link>
        </p>

        <p>
          <Link
            href={{
              pathname: ROUTES.users.list,
            }}
          >
            <a class="active">Users</a>
          </Link>
        </p>
      </div>

      <Grid container mt={2}>
        <Grid xs={6}>
            <Typography variant="h4">Users List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.users.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<AddBoxIcon fontSize="small" />}>
                New User
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid xs={12}>
          <table cellspacing="7" cellpadding="4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.users.show,
                          query: {
                            id: user.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.users.edit,
                          query: {
                            id: user.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteUser(user)}>
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserList;
