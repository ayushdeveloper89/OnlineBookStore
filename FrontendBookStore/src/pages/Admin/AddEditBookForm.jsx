import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Button,
    FormHelperText,
    Grid,
    TextField,
    Stack,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEditBookForm = (props) => {
    const [imageFile, setImageFile] = useState(null)
    const { bookData, isEdit, getAllBooks, handleClose } = props.childProps;

    const initialValues = {
        title: bookData ? bookData.title : '',
        author: bookData ? bookData.author : '',
        image: bookData ? bookData.image : '',
        price: bookData ? bookData.price : '',
        category: bookData ? bookData.category : ''
    }
    const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        author: Yup.string().max(255).required('Author is required'),
        price: Yup.number().required('Price is required'),
        category: Yup.string().max(255).required('Category is required'),
        image: Yup
            .mixed()
            .required("Image is required")
            .test("is-valid-type", "Not a valid image type",
                value => isValidFileType(value && value.name.toLowerCase(), "image"))
            .test("is-valid-size", "Max allowed size is 100KB",
                value => value && value.size <= 102400000000)
    })

    const handleCustomSubmit = async (e, values) => {
        e.preventDefault();
        const formData = new FormData();
        if(imageFile){
            formData.append('imageFile', imageFile);
        }
        formData.append('bookConst', JSON.stringify(values));
        try {
            if(isEdit){
                formData.append('id', bookData._id);
                const submitItems = await axios.post('/adminBooks/updateBook', formData)
            }else{
                const submitItems = await axios.post('/adminBooks/addNewBook', formData)
            }
            getAllBooks()
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                // values.contactInfo.state = selectedStateId;
                // try {
                //     setStatus({ success: false });
                //     setSubmitting(false);
                //     handleCustomSubmit(values)
                // } catch (err) {
                //     setStatus({ success: false });
                //     setErrors({ submit: err.message });
                //     setSubmitting(false);
                // }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (

                <form noValidate onSubmit={(e) => { e.preventDefault(); handleCustomSubmit(e, values) }} encType='multipart/form-data'>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="title-signup">Title*</InputLabel>
                                <OutlinedInput
                                    id="title-login"
                                    type="text"
                                    value={values.title}
                                    name="title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Jane"
                                    fullWidth
                                    error={Boolean(touched.title && errors.title)}
                                />
                                {touched.title && errors.title && (
                                    <FormHelperText error id="helper-text-title-signup">
                                        {errors.title}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="author-signup">Author*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.author && errors.author)}
                                    id="author-signup"
                                    type="text"
                                    value={values.author}
                                    name="author"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    inputProps={{}}
                                />
                                {touched.author && errors.author && (
                                    <FormHelperText error id="helper-text-author-signup">
                                        {errors.author}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="price-signup">Price*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.price && errors.price)}
                                    id="price-login"
                                    type="number"
                                    value={values.price}
                                    name="price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    placeholder="example@mail.com"
                                    inputProps={{}}
                                />
                                {touched.price && errors.price && (
                                    <FormHelperText error id="helper-text-price-signup">
                                        {errors.price}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="category-signup">Category</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.category && errors.category)}
                                    id="category-signup"
                                    type='text'
                                    value={values.category}
                                    name="category"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="Category"
                                    inputProps={{}}
                                />
                                {touched.category && errors.category && (
                                    <FormHelperText error id="helper-text-category-signup">
                                        {errors.category}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="image-signup">Image</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    error={Boolean(touched.image && errors.image)}
                                    id="image-signup"
                                    type='file'
                                    value={values.image}
                                    name="image"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        setImageFile(e.currentTarget.files[0])
                                    }}
                                    placeholder="image"
                                    inputProps={{}}
                                />
                                {touched.image && errors.image && (
                                    <FormHelperText error id="helper-text-image-signup">
                                        {errors.image}
                                    </FormHelperText>
                                )}
                            </Stack>
                        </Grid>
                        {isEdit ? 
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                            <Typography>
                            Existing Image: 
                            </Typography>
                            <img src={`http://localhost:5000/bookImages/${bookData.image}`} alt="" width={200} height={100}/>
                            </Stack>
                        </Grid>
                        : null}
                    </Grid>
                    {errors.submit && (
                        <Grid item xs={12}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                    )}
                    <Typography textAlign={"center"}>
                        {isEdit ?
                            <Button type="submit" disableElevation size="large" variant="contained" color="primary" sx={{ mt: 3 }} >
                            Update Book
                        </Button>
                        :
                        <Button type="submit" disableElevation size="large" variant="contained" color="primary" sx={{ mt: 3 }} >
                            Add New Book
                        </Button>}
                    </Typography>
                </form>
            )}
        </Formik>
    )
}

export default AddEditBookForm
