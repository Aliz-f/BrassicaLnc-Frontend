// assets
import {
    IconDashboard,
    IconHome,
    IconColorSwatch,
    IconAdjustments,
    IconDownload,
    IconChartInfographic,
    IconSearch,
    IconCodePlus,
    IconQuestionMark,
    IconMailbox,
    IconBarcode,
    IconTarget
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconHome,
    IconColorSwatch,
    IconAdjustments,
    IconDownload,
    IconChartInfographic,
    IconSearch,
    IconCodePlus,
    IconQuestionMark,
    IconMailbox,
    IconBarcode,
    IconTarget
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'brassicaLnc',
    title: 'BrassicaLnc',
    type: 'group',
    caption: 'v2.1.3',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'transcripts',
            title: 'Transcripts',
            type: 'item',
            url: '/transcripts',
            icon: icons.IconColorSwatch,
            breadcrumbs: false
        },
        {
            id: 'multiomics',
            title: 'Multi-Omics',
            type: 'collapse',
            icon: icons.IconAdjustments,
            children: [
                // {
                //     id: 'transposon',
                //     title: 'Transposon',
                //     type: 'item',
                //     url: '/multi-omics/transposon',
                //     icon: icons.IconBarcode,
                //     breadcrumbs: false,
                //     caption: 'coming soon'
                // },
                // {
                //     id: 'variation',
                //     title: 'Variation',
                //     type: 'item',
                //     url: '/multi-omics/variation',
                //     icon: icons.IconBarcode,
                //     breadcrumbs: false,
                //     caption: 'coming soon'
                // },
                {
                    id: 'small-rna-targets',
                    title: 'Small RNA Targets',
                    type: 'item',
                    url: '/multi-omics/small-rna-targets',
                    icon: icons.IconBarcode,
                    breadcrumbs: false
                    // caption: 'coming soon'
                },
                // {
                //     id: 'qtl',
                //     title: 'QTL',
                //     type: 'item',
                //     url: '/multi-omics/qtl',
                //     icon: icons.IconBarcode,
                //     breadcrumbs: false,
                //     caption: 'coming soon'
                // },
                {
                    id: 'premi-rna',
                    title: 'Premi RNA',
                    type: 'item',
                    url: '/multi-omics/premi-rna',
                    icon: icons.IconBarcode,
                    breadcrumbs: false
                    // caption: 'coming soon'
                },
                {
                    id: 'target',
                    title: 'Target',
                    type: 'item',
                    url: '/multi-omics/target',
                    icon: icons.IconTarget,
                    breadcrumbs: false
                    // caption: 'coming soon'
                }
                // {
                //     id: 'gwas',
                //     title: 'GWAS',
                //     type: 'item',
                //     url: '/multi-omics/gwas',
                //     icon: icons.IconBarcode,
                //     breadcrumbs: false,
                //     caption: 'coming soon'
                // }
            ]
        },
        {
            id: 'download',
            title: 'Download',
            type: 'item',
            url: '/download',
            icon: icons.IconDownload,
            breadcrumbs: false
        },
        {
            id: 'statistics',
            title: 'Statistics',
            type: 'item',
            url: '/statistics',
            icon: icons.IconChartInfographic,
            breadcrumbs: false
        },
        {
            id: 'search',
            title: 'Search',
            type: 'collapse',
            icon: icons.IconSearch,
            breadcrumbs: false,
            children: [
                {
                    id: 'search-by-id',
                    title: 'By ID',
                    type: 'item',
                    url: '/search/by-id',
                    icon: icons.IconBarcode,
                    breadcrumbs: false
                },
                {
                    id: 'search-by-expression',
                    title: 'By Expression',
                    type: 'item',
                    url: '/search/by-expression',
                    icon: icons.IconBarcode,
                    breadcrumbs: false
                },
                {
                    id: 'search-by-sequence',
                    title: 'By Sequence',
                    type: 'item',
                    url: '/search/by-sequence',
                    icon: icons.IconBarcode,
                    breadcrumbs: false,
                    caption: 'With BlastN'
                }
            ]
        },
        {
            id: 'submit',
            title: 'Submit',
            type: 'item',
            url: '/submit',
            icon: icons.IconCodePlus,
            breadcrumbs: false
        },
        {
            id: 'help',
            title: 'Help',
            type: 'item',
            url: '/help',
            icon: icons.IconQuestionMark,
            breadcrumbs: false
        },
        {
            id: 'contact',
            title: 'Contact',
            type: 'item',
            url: '/contact',
            icon: icons.IconMailbox,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
