import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.addScope('email');

const auth = getAuth();

export const loginByFirebase = async () => {
  const result = await signInWithPopup(auth, provider);

  const data = await result.user.getIdToken();

  return data;
};
