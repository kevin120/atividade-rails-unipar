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
import { Container } from "@mui/system";
import CategoryService from "../../src/services/CategoryService";

function CategoryList() {
  const { router } = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteCategory = (category) => {
    var accepted = confirm(`Você realmente gostaria de deletar a categoria: ${category.name}`);
    if (!accepted) return;

    setIsLoading(true);
    CategoryService.destroy(category.id)
      .then((data) => {
        getCategories().then(() => {
          setIsLoading(false);
          toast.success("Category destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying Category: ${e.message}`);
      });
  };

  const getCategories = async () => {
    let data = await CategoryService.getAll();
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    getCategories().then(() => {
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
            <a class="active">Categories</a>
          </Link>
        </p>

        <p>
          <Link
            href={{
              pathname: ROUTES.users.list,
            }}
          >
            <a>Users</a>
          </Link>
        </p>
      </div>
      <Grid container mt={2}>
        <Grid xs={6}>
            <Typography variant="h4">Categories List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.categories.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<AddBoxIcon fontSize="small" />}>
                New Category
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
                <th>Created At</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                return (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.created_at}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.categories.show,
                          query: {
                            id: category.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.categories.edit,
                          query: {
                            id: category.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteCategory(category)}>
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

export default CategoryList;
