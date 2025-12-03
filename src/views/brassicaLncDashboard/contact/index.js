import { Stack } from '@mui/material';
import { styled } from '@mui/system';
import colors from 'assets/scss/_themes-vars.module.scss';
// ==============================|| BrassicaLnc Contact ||============================== //

const Email = styled('a')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: colors.primary800,
    borderRadius: theme.shape.borderRadius,
    padding: '6px 6px',
    margin: '6px',
    fontWeight: 'bold'
}));

const Website = styled('a')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: colors.secondary800,
    borderRadius: theme.shape.borderRadius,
    padding: '6px 6px',
    margin: '6px',
    fontWeight: '900'
}));

function Contact() {
    return (
        <>
            <h1 style={{ color: colors.secondary800 }}>Contact Us</h1>
            <Stack spacing={0} direction="column">
                <h2 style={{ color: colors.secondary800 }}>Dr. Aboozar Soorni:</h2>
                <Stack spacing={0} direction="row">
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <Website children="https://pcg-lab.iut.ac.ir/en" href="https://pcg-lab.iut.ac.ir/en" target="_blank" />
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <Email children="Soorni@iut.ac.ir" href="mailto:Soorni@iut.ac.ir" />
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <Email children="Aboozar.soorni@gmail.com" href="mailto:Aboozar.soorni@gmail.com" />
                </Stack>
            </Stack>

            <p>
                If you have any problem, comments or suggestions about our database, Please contact us. All comments and suggestions on this
                database will be highly appreciated.{' '}
            </p>
        </>
    );
}

export default Contact;
