const menu = [
    {
        label: 'Dashboard',
        icon: 'fas fa-camera'
    },
    {
        label: 'Cadastros',
        icon: 'fas fa-edit',
        children: [
            {
                label: 'Plano',
                icon: 'fas fa-ellipsis-v',
                children: [
                    {
                        label: 'Internet',
                        icon: 'fas fa-globe'
                    },
                    {
                        label: 'TV',
                        icon: 'fas fa-tv'
                    },
                    {
                        label: 'Telefone',
                        icon: 'fas fa-phone'
                    },
                ]
            }
        ]
    }
];

export default menu;