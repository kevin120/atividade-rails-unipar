import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import ArticleService from "../../../src/services/ArticleService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

function ShowArticle() {
  const router = useRouter()
  const { id } = router.query

  const [article, setArticle] = useState(null);

  useEffect(() => {
    ArticleService.getById(id).then((data) => {
      setArticle(data)
    })
  }, [id])

  if (!article) return `Carregando...`

  return (
    <>
      <p>Exibindo o artigo: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.articles.list,
          }}
        >
          <Button variant="contained" color="error" size="small" startIcon={<ArrowBackIcon fontSize="small" />}>Voltar</Button>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{article.id}</dd>

        <dt>Title</dt>
        <dd>{article.title}</dd>

        <dt>Author</dt>
        <dd>{article.author.name}</dd>

        <dt>Category</dt>
        <dd>{article.category.name}</dd>

        <dt>Body</dt>
        <dd>{article.body}</dd>

        <dt>Created At</dt>
        <dd>{article.created_at}</dd>
      </dl>

    </>
  );
}

export default ShowArticle;