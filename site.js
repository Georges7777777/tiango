/* L'application Tiango vit désormais dans /app/. Si une ancienne version avait été installée à la racine du site,
   son mode hors ligne continuerait de servir d'anciennes pages ici : on le désinscrit. Les données ne sont pas touchées. */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (rs) {
    rs.forEach(function (r) { if (new URL(r.scope).pathname === location.pathname.replace(/[^/]*$/, '')) r.unregister(); });
  }).catch(function () {});
}
