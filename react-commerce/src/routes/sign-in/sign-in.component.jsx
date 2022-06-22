import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import { 
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {

    useEffect(() => {
        async function getResult()
        {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response)
            {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        getResult();
    }, []);

    const logGoogleUser = async() => {
        const { user }= await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;