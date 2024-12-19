let jwk;
const publicKeyPem = fs.readFileSync(path.resolve(__dirname, '../certs/public.pem'), 'utf8');
jose.JWK.asKey(publicKeyPem, 'pem')
    .then((result) => {
        jwk = result.toJSON();
        console.log('JWK generated:', jwk);
    })
    .catch((error) => {
        console.error('Error converting public key to JWK:', error);
    });