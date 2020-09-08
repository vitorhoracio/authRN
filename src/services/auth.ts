interface Response{
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: '9a87sd98a798vdf798fg7n9g8h7v9w873429',
                user: {
                    name:'Vitor',
                    email: 'vitor@horacio.com'
                },
            })
        }, 2000);
    });
}