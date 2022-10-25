import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import CategoryService from "../../../src/services/CategoryService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";


function ShowCategory() {
  const router = useRouter()
  const { id } = router.query

  const [category, setCategory] = useState(null);

  useEffect(() => {
    CategoryService.getById(id).then((data) => {
      setCategory(data)
      
    })
  }, [id])
  
  if (!category) return `Carregando...`
  return (
    <>
      <p>Exibindo a Categoria: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.categories.list,
          }}
        >
          <Button variant="contained" color="error" size="small" startIcon={<ArrowBackIcon fontSize="small" />}>Voltar</Button>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{category.id}</dd>

        <dt>Name</dt>
        <dd>{category.name}</dd>

        <dt>Created At</dt>
        <dd>{category.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowCategory;