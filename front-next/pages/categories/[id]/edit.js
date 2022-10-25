import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import CategoryService from "../../../src/services/CategoryService";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

function EditCategory() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);
  
  useEffect(() => {
    CategoryService.getById(id).then((data) => {
      setCategory(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateCategory = (category) => {
    CategoryService.update(id, category).then((data) => {
      router.push(ROUTES.categories.list)
      toast.success(`Category successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating category: ${e.message}`)
    })
  }

  if (!category) return `Carregando...`

  return (
    <>
      <p>Página de Edição do categoria: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.categories.list,
          }}
        >
          <Button variant="contained" color="error" size="small" startIcon={<ArrowBackIcon fontSize="small" />}>Voltar</Button>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateCategory(data))}>
        
        <div className="field">
          <label>Name</label>
          <input {...register("name", { required: true })} defaultValue={category.name} />
          {errors.name && <p>name is required.</p>}
        </div>

        <Button type="submit" variant="contained" color="success" size="small" startIcon={<SendIcon fontSize="small"/>}>
          Enviar
        </Button>
      </form>
    </>
  );
}

export default EditCategory;
