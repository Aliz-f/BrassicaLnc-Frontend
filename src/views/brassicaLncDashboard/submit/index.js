// material-ui
import { useState } from 'react';
import api from 'routes/api.json';

import { FormGroup, Paper, Stack } from '@mui/material';
import colors from 'assets/scss/_themes-vars.module.scss';
import Input from 'ui-component/Input';
import Button from 'ui-component/Button';
import TextArea from 'ui-component/TeaxtArea';
import axios from 'axios';
import { toast } from 'react-toastify';

// ==============================|| BrassicaLnc Submit ||============================== //

function Submit() {
    const [email, setEmail] = useState({
        id: 'email',
        title: 'Your Email',
        placeholder: 'example@example.com',
        value: '',
        error: 'Email is required'
    });
    const [chromosome, setChromosome] = useState({
        id: 'chromosome',
        title: 'Chromosome',
        placeholder: 'Example:9 or Mt',
        value: '',
        error: 'Chromosome is required'
    });
    const [location, setLocation] = useState({
        id: 'location',
        title: 'Location',
        placeholder: 'Example:1101-4206',
        value: '',
        error: 'Location is required'
    });
    const [strand, setStrand] = useState({
        id: 'strand',
        title: 'Strand',
        placeholder: '+ or -',
        value: '',
        error: 'Strand is required'
    });
    // const [exonLocation, setExonLocation] = useState({
    //     id: 'exonLocation',
    //     title: 'ExonLocation',
    //     placeholder: 'Example:96343222,96348289,96349707,96358894',
    //     value: '',
    //     error: 'ExonLocation is required'
    // });
    const [sequence, setSequence] = useState({
        id: 'sequence',
        title: 'Sequence',
        placeholder: 'Example:TCTAGAACCCTAGCGGGCGGCGAGGAC',
        value: '',
        error: 'Sequence is required'
    });
    const [name, setName] = useState({
        id: 'name',
        title: 'Name',
        placeholder: 'Example:Osa01LNT0000100.1',
        value: '',
        error: ''
    });
    const [expressionValue, setExpressionValue] = useState({
        id: 'expressionValue',
        title: 'Expression Value',
        placeholder: 'Example: 0.76',
        value: '',
        error: ''
    });
    const [sampleInformation, setSampleInformation] = useState({
        id: 'sampleInformation',
        title: 'Sample Information',
        placeholder: 'Example:intergenetic lncRNA (lincRNA)',
        value: '',
        error: ''
    });
    const [experimentalDesign, setExperimentalDesign] = useState({
        id: 'experimentalDesign',
        title: 'Experimental Design',
        placeholder: '',
        value: '',
        error: ''
    });
    const [lncRNAFunction, setLncRNAFunction] = useState({
        id: 'lncRNAFunction',
        title: 'lncRNA Function',
        placeholder: '',
        value: '',
        error: ''
    });
    const [reference, setReference] = useState({
        id: 'reference',
        title: 'Reference',
        placeholder: 'Reference PubMed ID',
        value: '',
        error: ''
    });
    const [otherInformation, setOtherInformation] = useState({
        id: 'otherInformation',
        title: 'Other Information',
        placeholder: '',
        value: '',
        error: ''
    });

    const [errors, setErrors] = useState({
        email: email.error,
        chromosome: chromosome.error,
        location: location.error,
        strand: strand.error,
        // exonLocation: exonLocation.error,
        sequence: sequence.error
    });

    function validateForm() {
        if (errors.email || errors.chromosome || errors.location || errors.exonLocation || errors.strand || errors.sequence) {
            return false;
        }
        return true;
    }

    function ValidateEmail(mail) {
        // eslint-disable-next-line no-useless-escape
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            setEmail({ ...email, value: mail });
            setErrors({ ...errors, email: '' });
            return true;
        }
        setEmail({ ...email, value: mail });
        setErrors({ ...errors, email: 'Please Enter Valid EMAIL' });
        return false;
    }

    const handleOnChange = (event) => {
        switch (event.target.id || event.target.name) {
            case 'email':
                ValidateEmail(event.target.value);
                break;
            case 'chromosome':
                setChromosome({ ...chromosome, value: event.target.value });
                if (event.target.value === '') {
                    setErrors({ ...errors, chromosome: chromosome.error });
                } else {
                    setErrors({ ...errors, chromosome: '' });
                }

                break;
            case 'location':
                setLocation({ ...location, value: event.target.value });
                if (event.target.value === '') {
                    setErrors({ ...errors, location: location.error });
                } else {
                    setErrors({ ...errors, location: '' });
                }
                break;
            case 'strand':
                setStrand({ ...strand, value: event.target.value });
                switch (event.target.value) {
                    case '+':
                        setErrors({ ...errors, strand: '' });
                        break;
                    case '-':
                        setErrors({ ...errors, strand: '' });
                        break;
                    case '':
                        setErrors({ ...errors, strand: strand.error });
                        break;
                    default:
                        setErrors({ ...errors, strand: 'strand must be + or -' });
                        break;
                }
                break;
            // case 'exonLocation':
            //     setExonLocation({ ...exonLocation, value: event.target.value });
            //     if (event.target.value === '') {
            //         setErrors({ ...errors, exonLocation: exonLocation.error });
            //     } else {
            //         setErrors({ ...errors, exonLocation: '' });
            //     }
            //     break;
            case 'sequence':
                setSequence({ ...sequence, value: event.target.value });
                if (event.target.value === '') {
                    setErrors({ ...errors, sequence: sequence.error });
                } else {
                    setErrors({ ...errors, sequence: '' });
                }
                break;
            case 'name':
                setName({ ...name, value: event.target.value });
                break;
            case 'expressionValue':
                setExpressionValue({ ...expressionValue, value: event.target.value });
                break;
            case 'sampleInformation':
                setSampleInformation({ ...sampleInformation, value: event.target.value });
                break;
            case 'experimentalDesign':
                setExperimentalDesign({ ...experimentalDesign, value: event.target.value });
                break;
            case 'lncRNAFunction':
                setLncRNAFunction({ ...lncRNAFunction, value: event.target.value });
                break;
            case 'reference':
                setReference({ ...reference, value: event.target.value });
                break;
            case 'otherInformation':
                setOtherInformation({ ...otherInformation, value: event.target.value });
                break;

            default:
                break;
        }
    };

    const resetStates = () => {
        setEmail({
            id: 'email',
            title: 'Your Email',
            placeholder: 'example@example.com',
            value: '',
            error: 'Email is required'
        });
        setChromosome({
            id: 'chromosome',
            title: 'Chromosome',
            placeholder: 'Example:9 or Mt',
            value: '',
            error: 'Chromosome is required'
        });
        setLocation({
            id: 'location',
            title: 'Location',
            placeholder: 'Example:1101-4206',
            value: '',
            error: 'Location is required'
        });
        setStrand({
            id: 'strand',
            title: 'Strand',
            placeholder: '+ or -',
            value: '',
            error: 'Strand is required'
        });
        // setExonLocation({
        //     id: 'exonLocation',
        //     title: 'ExonLocation',
        //     placeholder: 'Example:96343222,96348289,96349707,96358894',
        //     value: '',
        //     error: 'ExonLocation is required'
        // });
        setSequence({
            id: 'sequence',
            title: 'Sequence',
            placeholder: 'Example:TCTAGAACCCTAGCGGGCGGCGAGGAC',
            value: '',
            error: 'Sequence is required'
        });
        setName({
            id: 'name',
            title: 'Name',
            placeholder: 'Example:Osa01LNT0000100.1',
            value: '',
            error: ''
        });
        setExpressionValue({
            id: 'expressionValue',
            title: 'Expression Value',
            placeholder: 'Example: 0.76',
            value: '',
            error: ''
        });
        setSampleInformation({
            id: 'sampleInformation',
            title: 'Sample Information',
            placeholder: 'Example:intergenetic lncRNA (lincRNA)',
            value: '',
            error: ''
        });
        setExperimentalDesign({
            id: 'experimentalDesign',
            title: 'Experimental Design',
            placeholder: '',
            value: '',
            error: ''
        });
        setLncRNAFunction({
            id: 'lncRNAFunction',
            title: 'lncRNA Function',
            placeholder: '',
            value: '',
            error: ''
        });
        setReference({
            id: 'reference',
            title: 'Reference',
            placeholder: 'Reference PubMed ID',
            value: '',
            error: ''
        });
        setOtherInformation({
            id: 'otherInformation',
            title: 'Other Information',
            placeholder: '',
            value: '',
            error: ''
        });
        setErrors({
            email: email.error,
            chromosome: chromosome.error,
            location: location.error,
            strand: strand.error,
            // exonLocation: exonLocation.error,
            sequence: sequence.error
        });
    };
    const handleSubmitRecord = () => {
        if (validateForm()) {
            axios
                .post(`${api.mainURL}/submit/`, {
                    email: email.value,
                    chromosome: chromosome.value,
                    location: location.value,
                    strand: strand.value,
                    // exonLocation: exonLocation.value,
                    sequence: sequence.value,
                    namea: name.value,
                    expressionValue: expressionValue.value,
                    sampleInformation: sampleInformation.value,
                    experimentalDesign: experimentalDesign.value,
                    lncRNAFunction: lncRNAFunction.value,
                    reference: reference.value,
                    otherInformation: otherInformation.value
                })
                .then(() =>
                    toast.info('successfuly submited.', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                )
                .then(() => resetStates())
                .catch(() =>
                    toast.warn('server error. please try again later.', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                );
        }
        console.log('errors exist');
    };
    return (
        <>
            <h1 style={{ color: colors.secondary800 }}>Submit Form</h1>
            <Paper variant="outlined" sx={{ display: { xs: 'block', md: 'block' }, m: '18px 18px 36px 18px', p: 1, border: '0' }}>
                <FormGroup>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{email.title}:</h4>
                            <Input
                                id={email.id}
                                value={email.value}
                                onChange={handleOnChange}
                                placeholder={email.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {errors.email && <p style={{ color: 'red' }}>* {errors.email}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{chromosome.title}:</h4>
                            <Input
                                id={chromosome.id}
                                value={chromosome.value}
                                onChange={handleOnChange}
                                placeholder={chromosome.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {errors.chromosome && <p style={{ color: 'red' }}>* {errors.chromosome}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{location.title}:</h4>
                            <Input
                                id={location.id}
                                value={location.value}
                                onChange={handleOnChange}
                                placeholder={location.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {errors.location && <p style={{ color: 'red' }}>* {errors.location}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{strand.title}:</h4>
                            <Input
                                id={strand.id}
                                value={strand.value}
                                onChange={handleOnChange}
                                placeholder={strand.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {errors.strand && <p style={{ color: 'red' }}>* {errors.strand}</p>}
                        </Stack>
                        {/* <Stack spacing={0} direction="column">
                            this comment is for ctrl + d to eddit
                            <h4>{exonLocation.title}:</h4>
                            <Input
                                id={exonLocation.id}
                                value={exonLocation.value}
                                onChange={handleOnChange}
                                placeholder={exonLocation.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {errors.exonLocation && <p style={{ color: 'red' }}>* {errors.exonLocation}</p>}
                        </Stack> */}
                        <Stack spacing={0} direction="column" sx={{ width: 1 }}>
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{sequence.title}:</h4>
                            <TextArea
                                id={sequence.id}
                                minRows={6}
                                value={sequence.value}
                                onChange={handleOnChange}
                                placeholder={sequence.placeholder}
                                sx={{ width: 1 }}
                            />
                            {errors.sequence && <p style={{ color: 'red' }}>* {errors.sequence}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{name.title}:</h4>
                            <Input
                                id={name.id}
                                value={name.value}
                                onChange={handleOnChange}
                                placeholder={name.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {name.error && <p style={{ color: 'red' }}>* {name.error}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{expressionValue.title}:</h4>
                            <Input
                                id={expressionValue.id}
                                value={expressionValue.value}
                                onChange={handleOnChange}
                                placeholder={expressionValue.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {expressionValue.error && <p style={{ color: 'red' }}>* {expressionValue.error}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{sampleInformation.title}:</h4>
                            <Input
                                id={sampleInformation.id}
                                value={sampleInformation.value}
                                onChange={handleOnChange}
                                placeholder={sampleInformation.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {sampleInformation.error && <p style={{ color: 'red' }}>* {sampleInformation.error}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{experimentalDesign.title}:</h4>
                            <Input
                                id={experimentalDesign.id}
                                value={experimentalDesign.value}
                                onChange={handleOnChange}
                                placeholder={experimentalDesign.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {experimentalDesign.error && <p style={{ color: 'red' }}>* {experimentalDesign.error}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{lncRNAFunction.title}:</h4>
                            <Input
                                id={lncRNAFunction.id}
                                value={lncRNAFunction.value}
                                onChange={handleOnChange}
                                placeholder={lncRNAFunction.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {lncRNAFunction.error && <p style={{ color: 'red' }}>* {lncRNAFunction.error}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column">
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{reference.title}:</h4>
                            <Input
                                id={reference.id}
                                value={reference.value}
                                onChange={handleOnChange}
                                placeholder={reference.placeholder}
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                            {reference.error && <p style={{ color: 'red' }}>* {reference.error}</p>}
                        </Stack>
                        <Stack spacing={0} direction="column" sx={{ width: 1 }}>
                            {/* this comment is for ctrl + d to eddit */}
                            <h4>{otherInformation.title}:</h4>
                            <TextArea
                                id={otherInformation.id}
                                minRows={6}
                                value={otherInformation.value}
                                onChange={handleOnChange}
                                placeholder={otherInformation.placeholder}
                                sx={{ width: 1 }}
                            />
                            {otherInformation.error && <p style={{ color: 'red' }}>* {otherInformation.error}</p>}
                        </Stack>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                marginTop: '36px'
                            }}
                        >
                            <Button onClick={handleSubmitRecord} sx={{ maxHeight: '48px', border: 1 }}>
                                Submit Record
                            </Button>
                        </div>
                    </div>
                </FormGroup>
            </Paper>
        </>
    );
}

export default Submit;
