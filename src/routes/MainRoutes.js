import { lazy } from 'react';

// project imports
// eslint-disable-next-line import/no-cycle
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sidebar routing
const Home = Loadable(lazy(() => import('views/brassicaLncDashboard/home')));
const Transcripts = Loadable(lazy(() => import('views/brassicaLncDashboard/transcripts')));
const TranscriptContent = Loadable(lazy(() => import('views/brassicaLncDashboard/transcripts/content')));
const Transposon = Loadable(lazy(() => import('views/brassicaLncDashboard/multi-omics/transposon')));
const Download = Loadable(lazy(() => import('views/brassicaLncDashboard/download')));
const Statistics = Loadable(lazy(() => import('views/brassicaLncDashboard/statistics')));
const SearchById = Loadable(lazy(() => import('views/brassicaLncDashboard/search/byId')));
const SearchByExpression = Loadable(lazy(() => import('views/brassicaLncDashboard/search/byExpression')));
const SearchBySequence = Loadable(lazy(() => import('views/brassicaLncDashboard/search/bySequence')));
const Submit = Loadable(lazy(() => import('views/brassicaLncDashboard/submit')));
const Help = Loadable(lazy(() => import('views/brassicaLncDashboard/help')));
const Contact = Loadable(lazy(() => import('views/brassicaLncDashboard/contact')));
const SmallRnaTarget = Loadable(lazy(() => import('views/brassicaLncDashboard/multi-omics/SmallRnaTarget')));
const PremiRna = Loadable(lazy(() => import('views/brassicaLncDashboard/multi-omics/PremiRna/index')));
const TargetPage = Loadable(lazy(() => import('views/brassicaLncDashboard/multi-omics/target/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/transcripts',
            element: <Transcripts />
        },
        {
            path: '/transcripts/content/:transcriptID',
            element: <TranscriptContent />
        },
        {
            path: '/multi-omics/transposon',
            element: <Transposon />
        },
        {
            path: '/multi-omics/variation',
            element: <Transposon />
        },
        {
            path: '/multi-omics/target',
            element: <TargetPage />
        },
        {
            path: '/multi-omics/small-rna-targets',
            element: <SmallRnaTarget />
        },
        {
            path: '/multi-omics/qtl',
            element: <Transposon />
        },
        {
            path: '/multi-omics/premi-rna',
            element: <PremiRna />
        },
        {
            path: '/multi-omics/gwas',
            element: <Transposon />
        },
        {
            path: '/download',
            element: <Download />
        },
        {
            path: '/statistics',
            element: <Statistics />
        },
        {
            path: '/search/by-id',
            element: <SearchById />
        },
        {
            path: '/search/by-expression',
            element: <SearchByExpression />
        },
        {
            path: '/search/by-sequence',
            element: <SearchBySequence />
        },
        {
            path: '/submit',
            element: <Submit />
        },
        {
            path: '/contact',
            element: <Contact />
        },
        {
            path: '/help',
            element: <Help />
        }
    ]
};

export default MainRoutes;
