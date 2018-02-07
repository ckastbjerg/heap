export const onAuthChanged = (store, user) => ({ user });
export const viewAsFriend = (store, uid) => {
  const viewAsUid = uid === store.user.uid ? null : uid;
  return { viewAsUid };
};
export const toggleMenu = (store, uid) => {
  return { isMenuOpen: !store.isMenuOpen };
};
