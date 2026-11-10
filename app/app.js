'use strict';
/* ---------- Référentiel de la fiche : une seule définition sert au formulaire, au compte-rendu et à l'export Word ---------- */
const TYPES=['Monument historique','Château','Édifice religieux','Musée','Site archéologique','Site naturel','Parc / jardin','Quartier / centre historique','Village','Site industriel / entreprise','Cave / domaine / producteur','Mémorial / site de mémoire','Point de vue / panorama','Itinéraire / excursion','Restaurant','Hébergement','Autre'];
const S=(k,ico,t,f)=>({k,ico,t,f});
const SCHEMA=[
S('id','🏛️','Identification du site',[
 ['site','Nom du site à visiter','text','wide'],['ville','Lieu (ville, région ou pays)','text','wide'],['type','Type de site','select',TYPES],
 ['date','Date du dernier repérage','date'],['heure','Heure d\'arrivée','time'],['meteo','Conditions du jour (météo, affluence)','text'],
 ['adresse','Adresse','text','wide'],['cp','Code postal','text'],['pays','Pays','text'],
 ['web','Site internet','url'],['tel','Téléphone du site','tel'],['mail','E-mail du site','email'],
 ['contact','Contact sur place (nom, fonction)','text'],['contact_tel','Téléphone direct du contact','tel'],
 ['classement','Classement / label (MH, UNESCO, Musée de France…)','text','wide'],
 ['gestion','Gestionnaire (CMN, commune, privé…)','text']]),
S('hor','🕘','Horaires et périodes',[
 ['h_ouv','Ouverture habituelle (heure)','time'],['h_fer','Fermeture habituelle (heure)','time'],['h_haute','Horaires haute saison','textarea'],['h_basse','Horaires basse saison','textarea'],
 ['h_ferm','Jours de fermeture hebdomadaire : écrire seulement les jours fermés (ex. lundi, mardi)','text'],['h_except','Fermetures annuelles / exceptionnelles','text'],
 ['h_dern','Dernière admission','text'],['h_grp','Créneaux réservés aux groupes','text'],
 ['h_affl','Périodes d\'affluence à éviter','text'],['h_best','Meilleur moment (lumière, calme)','text']]),
S('tar','💶','Tarifs et réservation',[
 ['t_plein','Plein tarif individuel','text'],['t_red','Tarif réduit (et conditions)','text'],
 ['t_enf','Tarif enfants / jeunes','text'],['t_grat','Gratuités (âges, jours, conditions)','text'],
 ['t_grp','Tarif groupe (par personne)','text'],['t_grp_min','Effectif minimum pour le tarif groupe','text'],
 ['t_grp_max','Effectif maximum par groupe','text'],['t_scol','Tarif scolaires','text'],
 ['t_acc','Gratuité guide / accompagnateur / chauffeur','yn'],
 ['t_resa','Réservation obligatoire pour les groupes','yn'],
 ['t_delai','Délai de réservation','text'],['t_resa_ct','Service réservation (tél., e-mail, plateforme)','text'],
 ['t_paie','Moyens de paiement (CB, virement, bon d\'échange…)','text'],['t_annul','Acompte et conditions d\'annulation','text'],
 ['t_billet','Retrait des billets (où, par qui)','text','wide']]),
S('gui','🎧','Guidage et médiation',[
 ['g_libre','Visite libre possible','yn'],
 ['g_site','Guide du site obligatoire','yn'],
 ['g_ext','Guide extérieur autorisé à commenter','yn'],
 ['g_conf','Carte de guide-conférencier exigée','yn'],
 ['g_parole','Droit de parole (payant, à réserver)','yn'],
 ['g_audio','Audioguide disponible','yn'],
 ['g_audio_l','Langues et tarif de l\'audioguide','text'],
 ['g_phones','Audiophones obligatoires pour les groupes','yn'],
 ['g_vg','Visites guidées du site (langues, horaires, durée, tarif)','textarea'],
 ['g_max','Effectif maximum par guide','text'],
 ['g_supp','Supports de visite (plan, livret, appli, enfants)','text'],
 ['g_photo','Photographie autorisée','yn'],
 ['g_regles','Règles à respecter (silence, tenue, sacs, offices…)','textarea']]),
S('pmr','♿','Accessibilité',[
 ['p_acc','Accessible en fauteuil roulant','yn'],
 ['p_chem','Cheminement (marches, pentes, pavés, graviers, largeurs)','textarea'],
 ['p_asc','Ascenseur / élévateur','yn'],
 ['p_pret','Prêt de fauteuil ou de sièges-cannes','yn'],
 ['p_wc','Toilettes adaptées','yn'],
 ['p_park','Stationnement réservé','yn'],
 ['p_vis','Dispositifs handicap visuel','yn'],
 ['p_aud','Dispositifs handicap auditif (boucle magnétique…)','yn'],
 ['p_label','Label Tourisme & Handicap','yn'],
 ['p_repos','Bancs et points de repos sur le parcours','text'],
 ['p_marche','Difficulté de marche (distance, dénivelé, escaliers)','textarea']]),
S('acc','🚌','Accès et stationnement',[
 ['a_carok','Site accessible en autocar (route, gabarit, dernier kilomètre)','yn'],
 ['a_car','Parking autocars','yn'],
 ['a_car_d','Parking autocars : nombre de places, tarif, distance','text'],
 ['a_depose','Dépose-minute autocar près de l\'entrée','yn'],
 ['a_gabarit','Restrictions (hauteur, tonnage, rues étroites, ZFE)','text'],
 ['a_itin','Itinéraire d\'accès conseillé pour le car','textarea'],
 ['a_vl','Parking voitures (places, tarif)','text'],
 ['a_tc','Transports en commun (ligne, arrêt)','text'],
 ['a_pied','Distance à pied entre dépose et entrée','text'],
 ['a_rdv','Point de rendez-vous du groupe','text'],
 ['a_entree','Entrée des groupes (si différente)','text']]),
S('srv','🚻','Services sur place',[
 ['s_wc','Toilettes','yn'],
 ['s_wc_d','Toilettes : emplacement, nombre, payantes ou non','text'],
 ['s_vest','Vestiaire / consigne (sacs, bagages)','yn'],
 ['s_bout','Boutique','yn'],
 ['s_resto','Restauration sur place','yn'],
 ['s_resto_p','Restaurants proches acceptant les groupes','textarea'],
 ['s_pique','Aire de pique-nique','yn'],
 ['s_eau','Point d\'eau','yn'],
 ['s_abri','Abri en cas de pluie ou de forte chaleur','yn'],
 ['s_salle','Salle disponible pour le groupe','yn'],
 ['s_reseau','Réseau mobile / Wi-Fi','text']]),
S('sec','⚠️','Sécurité et contraintes',[
 ['x_ctrl','Contrôle de sécurité à l\'entrée','yn'],
 ['x_risq','Points de vigilance (escaliers, sols glissants, vide, circulation)','textarea'],
 ['x_secours','Poste de secours / défibrillateur','text'],
 ['x_meteo','Visite dépendante de la météo','yn'],
 ['x_planb','Solution de repli (pluie, fermeture, grève)','textarea']]),
S('cir','🧭','Éléments pour le circuit',[
 ['c_duree','Durée à prévoir sur le site (minutes)','number'],
 ['c_creneau','Créneau conseillé dans la journée','text'],
 ['c_avant','Étape précédente possible','text'],['c_avant_t','Temps de trajet depuis cette étape','text'],
 ['c_apres','Étape suivante possible','text'],['c_apres_t','Temps de trajet vers cette étape','text'],
 ['c_themes','Thèmes et points forts','textarea'],['c_public','Publics adaptés (scolaires, seniors, familles, experts…)','text'],
 ['c_note','Appréciation globale','select',['★★★★★ Incontournable','★★★★ Très intéressant','★★★ Intéressant','★★ Moyen','★ À éviter']],
 ['c_comment','Pistes pour le commentaire (anecdotes, sources)','textarea']]),
S('not','📝','Notes personnelles',[['notes','Notes libres','textarea','wide']])
];
const PROFIL=[['prenom','Prénom','text'],['nom','Nom','text'],['tel','Téléphone','tel'],['mail','E-mail','email'],
 ['carte','N° de carte de guide-conférencier','text'],['langues','Langues de guidage','text'],['structure','Agence / structure','text']];

/* Annuaire : rôles des prestataires */
const PRES_ROLES=['Chauffeur','Autocariste','Société sous-traitante','Guide local','Guide-conférencier','Restaurant','Hébergement','Site / gestionnaire','Autre'];
const SEJ_TYPES=['Hôtel','Camping','Gîte / location','Chambre d\'hôtes','Autre'];
const PARTS=[['matin','Matin','🌅'],['apres','Après-midi','☀️'],['soir','Soirée','🌙']];
const DAYS=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
/* ---------- Outils ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const frDate=s=>{if(!s)return '';const[y,m,d]=String(s).split('-');return d&&m?`${d}/${m}/${y}`:String(s)};
const slug=s=>(s||'reperage').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50)||'reperage';
function toast(m,ms=2600){$$('.toast').forEach(e=>e.remove());const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),ms)}
const gpsTxt=g=>g?`${g.lat.toFixed(5)}, ${g.lon.toFixed(5)}`+(g.acc?` (±${Math.round(g.acc)} m)`:''):'';
const gpsUrl=g=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g.lat+','+g.lon)}`;
function getGPS(timeout=15000){return new Promise((ok,ko)=>{
  if(!navigator.geolocation)return ko(new Error('Géolocalisation indisponible sur cet appareil'));
  navigator.geolocation.getCurrentPosition(p=>ok({lat:p.coords.latitude,lon:p.coords.longitude,acc:p.coords.accuracy,t:Date.now()}),
    e=>ko(new Error(e.code===1?'Localisation refusée : autorisez-la dans les réglages du navigateur':'Position introuvable (réseau ou ciel dégagé nécessaire)')),
    {enableHighAccuracy:true,timeout,maximumAge:20000})})}

/* ---------- Contrôle des données : tout ce qui vient d'un fichier est vérifié avant usage ---------- */
const arr=v=>Array.isArray(v)?v:[], obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const okId=s=>typeof s==='string'&&/^[A-Za-z0-9_-]{1,64}$/.test(s);
const fin=n=>typeof n==='number'&&isFinite(n);
const gpsOK=g=>g&&fin(g.lat)&&fin(g.lon)&&Math.abs(g.lat)<=90&&Math.abs(g.lon)<=180?{lat:g.lat,lon:g.lon,acc:fin(g.acc)?g.acc:0,t:fin(g.t)?g.t:0}:null;
const OPENABLE=/^(application\/pdf|image\/(jpeg|png|gif|webp)|text\/plain)$/;
const safeType=(t,kind)=>{t=String(t||'').toLowerCase().split(';')[0].trim();
  if(kind==='photo')return /^image\/(jpeg|png|gif|webp)$/.test(t)?t:'image/jpeg';
  return OPENABLE.test(t)||/^application\/(msword|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.[a-z.]+)$/.test(t)?t:'application/octet-stream'};
function fixRep(r){r.d=obj(r.d);r.gps=gpsOK(r.gps);r.updated=+r.updated||0;r.created=+r.created||r.updated;
  r.points=arr(r.points).filter(p=>p&&typeof p==='object');r.points.forEach(p=>{if(!okId(p.id))p.id=uid();p.gps=gpsOK(p.gps);if(p.lineId&&!okId(p.lineId))delete p.lineId});
  if(r.ctiId&&!okId(r.ctiId))delete r.ctiId;
  r.bud=arr(r.bud).filter(x=>x&&typeof x==='object');r.bud.forEach(l=>{if(!okId(l.id))l.id=uid()});return r}
function fixItem(i){i.updated=+i.updated||0;const A=k=>{i[k]=arr(i[k]).filter(x=>x&&typeof x==='object')};
  if(i.kind==='cti'){['lignes','pieces','apres'].forEach(A);i.h=obj(i.h);A('contacts');i.contacts.forEach(c=>{if(!okId(c.id))c.id=uid();if(!okId(c.presId))c.presId=''});if(!okId(i.circId))i.circId='';i.lignes.forEach(l=>{if(!okId(l.id))l.id=uid();l.gps=gpsOK(l.gps);if(!okId(l.repId))l.repId='';if(!okId(l.visId))l.visId='';if(!okId(l.fId))l.fId='';l.modCode=typeof l.modCode==='string'?l.modCode:'';l.grp=okId(l.grp)?l.grp:''});A('accs');i.accs.forEach(a=>{if(!okId(a.id))a.id=uid();if(!okId(a.presId))a.presId=''});if(!okId(i.repId))i.repId=''}
  if(i.kind==='vis'){if(!okId(i.lieuId))i.lieuId='';['modules','formules','faq','anec','planb','nepas','gloss','sources','conf','fiche'].forEach(A);i.secu=obj(i.secu);
    i.langs=arr(i.langs).map(l=>String(l).toLowerCase()).filter(l=>/^[a-z]{2,3}(-[a-z0-9]{2,4})?$/.test(l));if(!i.langs.length)i.langs=['fr'];
    i.modules.forEach(m=>{m.titre=obj(m.titre);m.texte=obj(m.texte)});i.formules.forEach((f,n)=>{if(!okId(f.id))f.id='f'+n+'-'+String(i.id||'').slice(-8)})}
  if(i.kind==='bud'){A('lignes');if(!okId(i.ctiId))i.ctiId='';if(!okId(i.circId))i.circId=''}
  if(i.kind==='cir'){['jours','sejours','bud'].forEach(A);
    i.jours.forEach(j=>{if(!okId(j.id))j.id=uid();if(!okId(j.sejId))j.sejId='';if(!['','prev'].includes(j.depSrc)&&!/^p:[A-Za-z0-9_-]{1,64}$/.test(String(j.depSrc||'')))j.depSrc='';j.depAdr=String(j.depAdr||'');j.finAdr=String(j.finAdr||'');j.parts=obj(j.parts);
      PARTS.forEach(([k])=>{j.parts[k]=arr(j.parts[k]).filter(x=>x&&typeof x==='object');j.parts[k].forEach(e=>{if(!okId(e.id))e.id=uid();if(!okId(e.lieuId))e.lieuId='';if(!okId(e.presId))e.presId='';if(!okId(e.visId))e.visId='';if(!okId(e.fId))e.fId='';if(!['lieu','libre','repas','autre'].includes(e.t))e.t='libre'})})});
    i.sejours.forEach(x=>{if(!okId(x.id))x.id=uid();if(!okId(x.presId))x.presId=''});i.bud.forEach(l=>{if(!okId(l.id))l.id=uid()})}
  if(i.kind==='rpg'){A('blocs');i.blocs.forEach(b=>{if(!okId(b.id))b.id=uid();if(!okId(b.lieuId))b.lieuId='';b.d=obj(b.d);b.pts=obj(b.pts);b.gps=gpsOK(b.gps)});if(!okId(i.circId))i.circId='';i.applied=obj(i.applied)}
  return i}

/* ---------- Base locale (IndexedDB) ---------- */
let _db;
function db(){return _db||(_db=new Promise((ok,ko)=>{
  const r=indexedDB.open('reperage-guide',2);
  r.onupgradeneeded=()=>{const d=r.result,has=n=>d.objectStoreNames.contains(n);
    if(!has('kv'))d.createObjectStore('kv');if(!has('reps'))d.createObjectStore('reps',{keyPath:'id'});
    if(!has('files'))d.createObjectStore('files',{keyPath:'id'}).createIndex('rep','repId');
    if(!has('items'))d.createObjectStore('items',{keyPath:'id'})};
  r.onblocked=()=>toast('Fermez les autres onglets Tiango : une mise à jour de la base attend.',8000);
  r.onsuccess=()=>{const d=r.result;d.onversionchange=()=>{d.close();toast('Tiango a été mis à jour dans un autre onglet : rechargez cette page.',10000)};ok(d)};
  r.onerror=()=>ko(r.error)}))}
async function tx(store,mode,fn){const d=await db();return new Promise((ok,ko)=>{
  const t=d.transaction(store,mode),s=t.objectStore(store);let out;const q=fn(s);
  if(q)q.onsuccess=()=>out=q.result;t.oncomplete=()=>ok(out);t.onerror=t.onabort=()=>ko(t.error||new Error('écriture annulée'))})}
/* plusieurs magasins dans UNE transaction : tout est écrit, ou rien */
async function txm(names,fn){const d=await db();return new Promise((ok,ko)=>{const t=d.transaction(names,'readwrite');
  t.oncomplete=()=>ok();t.onerror=t.onabort=()=>ko(t.error||new Error('écriture annulée'));
  try{fn(n=>t.objectStore(n))}catch(e){try{t.abort()}catch(_){}ko(e)}})}
const DB={
  get:(st,k)=>tx(st,'readonly',s=>s.get(k)), all:st=>tx(st,'readonly',s=>s.getAll()),
  put:(st,v,k)=>tx(st,'readwrite',s=>{k===undefined?s.put(v):s.put(v,k)}).then(r=>{if(st!=='kv')modTouch();return r}), del:(st,k)=>tx(st,'readwrite',s=>{s.delete(k)}).then(r=>{modTouch();return r}),
  filesOf:id=>tx('files','readonly',s=>s.index('rep').getAll(id))
};
/* éléments visibles : la corbeille est exclue */
const live=async st=>(await DB.all(st)).filter(x=>!x.deleted);

/* ---------- État et enregistrement ---------- */
let profil={}, cur=null, files=[], view='list', urls=new Map(), lastPoint=null;
let item=null;                        /* élément courant de la suite : CTI, site à visiter ou budget */
let saveT=null, itemT=null, dirty=false, idirty=false, pend=0;
const urlOf=f=>{if(!urls.has(f.id))urls.set(f.id,URL.createObjectURL(f.blob));return urls.get(f.id)};
const freeUrls=()=>{urls.forEach(u=>URL.revokeObjectURL(u));urls.clear()};
/* témoin d'enregistrement : invisible quand tout va bien ; ● pendant l'écriture ; ⚠ en cas d'échec */
function mark(s){const e=$('#sv');if(!e)return;if(s==='ok'&&(pend||dirty||idirty))return;e.dataset.s=s;e.textContent=s==='w'?'●':'⚠';e.hidden=s==='ok'||s==='w';
  e.title=e.ariaLabel=s==='e'?'Échec de l\'enregistrement sur cet appareil':''}
/* témoin de sauvegarde : 💾 orange tant que des modifications n'ont pas été sauvegardées dans un fichier */
let modT=null;
function modTouch(){clearTimeout(modT);modT=setTimeout(async()=>{try{await DB.put('kv',Date.now(),'lastMod')}catch(e){}bkRefresh()},800)}
async function bkRefresh(){const b=$('#bBk');if(!b)return;
  try{const lb=await DB.get('kv','lastBackup'),lm=await DB.get('kv','lastMod'),t=lb?(typeof lb==='object'?lb.t:lb):0;
    const n=(await live('reps')).length+(await live('items')).length+((profil&&(profil.nom||profil.prenom))?1:0);
    const stale=n>0&&(!t||(lm&&lm>t));b.hidden=!stale;
    b.title=b.ariaLabel=t?'Des modifications ne sont pas sauvegardées dans un fichier (dernière sauvegarde le '+frDate(new Date(t).toISOString().slice(0,10))+'). Appuyez pour sauvegarder':'Aucune sauvegarde dans un fichier : appuyez pour sauvegarder'}catch(e){}}
/* put() rend true si l'écriture a réussi, false sinon (jamais d'exception) */
function put(store,o){pend++;mark('w');return DB.put(store,o).then(()=>{pend--;mark('ok');return true},e=>{pend--;mark('e');toast('Enregistrement impossible : '+((e&&e.message)||'espace insuffisant ?')+'. Votre saisie est conservée à l\'écran.',7000);return false})}
/* en cas d'échec, la fiche reste marquée « à enregistrer » : la saisie n'est pas abandonnée et la prochaine tentative la reprendra */
/* les écritures sont mises en file : une demande qui arrive pendant une écriture attend son résultat avant de conclure
   (sinon un changement d'écran pourrait croire la fiche enregistrée alors que l'écriture en cours va échouer) */
let repP=Promise.resolve(true), itemP=Promise.resolve(true);
function flushRep(){clearTimeout(saveT);saveT=null;return repP=repP.then(async()=>{if(!cur||!dirty)return true;const o=cur;dirty=false;o.updated=Date.now();const ok=await put('reps',o);if(!ok&&cur===o){dirty=true;mark('e')}return ok})}
function flushItem(){clearTimeout(itemT);itemT=null;return itemP=itemP.then(async()=>{if(!item||!idirty)return true;const o=item;idirty=false;o.updated=Date.now();const ok=await put('items',o);if(!ok&&item===o){idirty=true;mark('e')}return ok})}
const flushAll=async()=>{const r=await Promise.all([flushRep(),flushItem()]);return r.every(Boolean)};
/* on ne quitte pas un écran dont la saisie n'a pas pu être enregistrée sans une décision explicite */
function unsavedBox(next){
  const what=item&&idirty?(KINDS[item.kind]?KINDS[item.kind].title(item):'cet élément'):cur?(cur.d.site||'cette fiche'):'cet élément';
  $('#modal').innerHTML=`<div class="modal" role="alertdialog" aria-modal="true" aria-label="Saisie non enregistrée"><div class="sheet"><h2>Saisie non enregistrée</h2>
   <p class="mute">Tiango n'a pas pu enregistrer « ${esc(what)} » sur cet appareil (espace insuffisant, ou stockage refusé par le navigateur). Votre saisie est toujours à l'écran : rien n'est perdu tant que vous restez ici.</p>
   <div style="display:grid;gap:10px;margin-top:12px"><button class="btn" id="uRetry">Réessayer l'enregistrement</button>
   <button class="btn sec" id="uFile">Mettre cette saisie à l'abri dans un fichier</button>
   <button class="btn sec" id="uStay">Rester sur cet écran</button>
   <button class="btn danger" id="uQuit">Quitter sans enregistrer</button></div></div></div>`;
  $('#uStay').onclick=closeModal;$('#uRetry').focus();
  $('#uRetry').onclick=async()=>{if(await flushAll()){closeModal();toast('Enregistré');next()}else toast('Toujours impossible. Libérez de l\'espace, ou mettez la saisie à l\'abri dans un fichier.',6000)};
  $('#uFile').onclick=()=>item&&idirty?backup([],slug(KINDS[item.kind].title(item))+'_non-enregistre.tiango.json',[item],true):backup([cur],slug(cur.d.site)+'_non-enregistre.tiango.json',[],true);
  $('#uQuit').onclick=()=>confirmBox('Abandonner la saisie non enregistrée ?','Les dernières modifications de « '+what+' » seront perdues.','Abandonner',()=>{dirty=false;idirty=false;mark('ok');next()});
}
/* save() : la fiche a changé. Écriture différée de 400 ms pendant la frappe, immédiate avec save(true). */
function save(now){if(!cur)return Promise.resolve();dirty=true;mark('w');if(now)return flushRep();clearTimeout(saveT);saveT=setTimeout(flushRep,400);return Promise.resolve()}
function saveItem(now){if(!item)return Promise.resolve();idirty=true;mark('w');if(now)return flushItem();clearTimeout(itemT);itemT=setTimeout(flushItem,400);return Promise.resolve()}
/* enregistre une fiche même si l'utilisateur a changé d'écran entre-temps (GPS, photo en cours) */
const saveRep=r=>{if(r===cur)return save(true);r.updated=Date.now();return repP=repP.then(()=>put('reps',r))};
const photos=pid=>files.filter(f=>f.kind==='photo'&&(pid===undefined||(f.pointId||'')===(pid||''))).sort((a,b)=>a.t-b.t);
const docs=()=>files.filter(f=>f.kind==='doc').sort((a,b)=>a.t-b.t);
const filled=sec=>sec.f.filter(([k])=>(cur.d[k]??'')!==''||(cur.d[k+'_d']??'')!=='').length;
/* résumé porté par la fiche, pour que la liste n'ait pas à charger toutes les photos */
function summary(r,fl){const ph=fl.filter(f=>f.kind==='photo').sort((a,b)=>a.t-b.t),np=ph.length,nd=fl.length-np,cover=np?ph[0].id:'';
  if(r.np===np&&r.nd===nd&&r.cover===cover)return false;r.np=np;r.nd=nd;r.cover=cover;return true}

/* ---------- Navigation : chaque écran s'inscrit dans VIEWS ---------- */
const VIEWS={};
let leave=null;                       /* nettoyage à faire en quittant l'écran courant */
async function go(v,id){
  if(!(await flushAll()))return unsavedBox(()=>go(v,id));   /* écriture refusée : la saisie reste à l'écran, l'utilisateur décide */
  const V=VIEWS[v];let ni=null,nc=null,nf=null;
  if(id){
    if(V.item){ni=await DB.get('items',id);if(!ni||ni.deleted){toast('Cet élément n\'existe plus sur cet appareil');return go(V.back)}}
    else{nc=await DB.get('reps',id);if(!nc||nc.deleted){toast('Cette fiche n\'existe plus sur cet appareil');return go('list')}nf=await DB.filesOf(id)}}
  if(leave){try{leave()}catch(e){}leave=null}
  view=v;window.scrollTo(0,0);closeModal();
  if(V.top){cur=null;files=[];item=null;freeUrls()}
  if(ni)item=fixItem(ni);
  if(nc){cur=fixRep(nc);files=nf;freeUrls();lastPoint=null}
  $('#bBack').hidden=!!V.top;if($('#lg'))$('#lg').hidden=!V.top;$('#bar').hidden=v!=='edit';$('#tabs').hidden=!V.top;
  $$('#tabs button').forEach(b=>{const on=b.dataset.v===v;b.classList.toggle('on',on);on?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current')});
  $('#ttl').innerHTML=V.top?V.t().replace(/^Tiango /,''):V.t();await V.r();imgGuard();
}
$('#bBack').onclick=()=>{const b=VIEWS[view].back;Array.isArray(b)?go(b[0],b[1]):go(b)};   /* un retour peut viser un élément précis : [écran, identifiant] */
$$('#tabs button').forEach(b=>b.onclick=()=>go(b.dataset.v));
const sub2=t=>`<span class="sub">${t}</span>`;
/* images de marque : retirées proprement si le fichier manque (pas de gestionnaire en ligne dans le HTML) */
function imgGuard(){$$('img.brand,#lg').forEach(i=>{const rm=()=>(i.closest('picture')||i).remove();if(i.complete&&!i.naturalWidth)rm();else i.onerror=rm})}
/* cartes de liste : activables au doigt, à la souris et au clavier */
function cards(root,fn){$$('.rep',root).forEach(e=>{e.setAttribute('role','button');e.tabIndex=0;e.onclick=()=>fn(e.dataset.id);
  e.onkeydown=k=>{if(k.key==='Enter'||k.key===' '){k.preventDefault();fn(e.dataset.id)}}})}
VIEWS.list={top:1,t:()=>'Tiango '+sub2('Sites à visiter par lieu'),r:()=>renderList()};
let editBack=null;   /* écran d'où l'on a ouvert la fiche : circuit, repérage… */
const openLieu=(id,back)=>{editBack=back||null;return go('edit',id)};
VIEWS.edit={get back(){return editBack||'list'},t:()=>esc(cur.d.site||'Nouveau site à visiter')+sub2('Fiche du site'),r:()=>renderEdit()};
VIEWS.report={back:'edit',t:()=>esc(cur.d.site||'Lieu')+sub2('Compte-rendu'),r:()=>renderReport()};
VIEWS.syn={back:'list',t:()=>'Synthèse des sites',r:()=>renderSyn()};

/* ---------- Liste ---------- */
async function renderList(){
  const reps=(await live('reps')).map(fixRep).filter(r=>!r.ctiId).sort((a,b)=>String(b.d.date||'').localeCompare(String(a.d.date||''))||b.updated-a.updated);
  const thumbs=new Map();
  for(const r of reps){
    if(r.np===undefined){summary(r,await DB.filesOf(r.id));DB.put('reps',r).catch(()=>{})}   /* fiches d'avant le résumé : calcul unique */
    if(r.cover){const f=await DB.get('files',r.cover);if(f&&f.blob){const u=URL.createObjectURL(f.blob);urls.set('l'+r.id,u);thumbs.set(r.id,u)}}}
  if(view!=='list')return;
  const who=[profil.prenom,profil.nom].filter(Boolean).join(' ');
  $('#main').innerHTML=`${who?'':`<div class="card" style="border-color:var(--acc)"><b>Bienvenue dans Tiango.</b> <span class="mute">Commencez par renseigner votre profil : il sera repris dans chaque compte-rendu.</span><div class="row" style="margin-top:10px"><button class="btn sm" id="bProf">Renseigner mon profil</button></div></div>`}
  ${licBanner()}<div id="rsmBox"></div><div class="row" style="margin-top:14px"><button class="btn acc grow" id="bNew">＋ Nouveau site à visiter</button></div>
  <div class="row" style="margin-top:10px"><button class="btn sec grow" id="bLieuIa">✨ Faire décrire par une IA</button>${reps.length>1?'<button class="btn sec grow" id="bSyn">🧭 Synthèse</button>':''}</div>
  ${reps.length>3?'<input class="search" id="q" type="search" placeholder="Rechercher un site, un lieu…" aria-label="Rechercher">':''}
  <div id="lst"></div>`;
  const draw=q=>{const L=reps.filter(r=>!q||[r.d.site,r.d.ville,r.d.type,r.d.pays].join(' ').toLowerCase().includes(q)).sort((a,b)=>String(a.d.ville||'~').trim().localeCompare(String(b.d.ville||'~').trim(),'fr')||String(a.d.site||'').localeCompare(String(b.d.site||''),'fr'));let last=null;
    $('#lst').innerHTML=L.length?L.map(r=>{const g=String(r.d.ville||'').trim(),h=g!==last?(last=g,`<h2 class="grp">${esc(g||'Lieu à préciser')}</h2>`):'';return h+`<div class="card rep" data-id="${esc(r.id)}"><div class="th">${thumbs.has(r.id)?'':'🏛️'}</div><div class="grow">
      <h3>${esc(r.d.site||'Site sans nom')}</h3><div class="mute">${esc([r.d.date?'repéré le '+frDate(r.d.date):''].filter(Boolean).join(' · '))}</div>
      ${g?'':'<span class="pill bad">⚠ Lieu à choisir</span>'}${r.d.type?`<span class="pill">${esc(r.d.type)}</span>`:''}${r.np?`<span class="pill">📷 ${+r.np}</span>`:''}${r.nd?`<span class="pill">📎 ${+r.nd}</span>`:''}${r.points.length?`<span class="pill">📍 ${r.points.length}</span>`:''}${lieuDuree(r)?`<span class="pill">⏱ ${mins(lieuDuree(r))}</span>`:''}${lieuFlags(r).filter(f=>f.lvl==='bloc').map(f=>`<span class="pill bad">${esc(f.ico+' '+f.short)}</span>`).join('')}</div></div>`}).join('')
      :`<div class="empty">${reps.length?'':'<picture><source srcset="logo-dark.png" media="(prefers-color-scheme:dark)"><img class="brand" src="logo.png" alt="Tiango"></picture><br>'}<b>${reps.length?'Aucun résultat':'Aucun site à visiter pour l\'instant'}</b>${reps.length?'':'Créez vos sites à visiter (cathédrale, musée, quartier, restaurant…), chacun rattaché à un lieu (ville, région, pays) : ils serviront à composer vos circuits.'}</div>`;
    $$('#lst .rep').forEach(e=>{const u=thumbs.get(e.dataset.id);if(u)$('.th',e).style.backgroundImage=`url("${u}")`});
    cards($('#lst'),id=>openLieu(id));imgGuard()};
  draw('');
  if($('#q'))$('#q').oninput=e=>draw(e.target.value.trim().toLowerCase());
  fillResume();
  $('#bNew').onclick=async()=>{if(!(await gate('reps')))return;
    askSite(async(nom,lieu)=>{const r={id:uid(),created:Date.now(),updated:Date.now(),d:{site:nom,ville:lieu,date:'',heure:'',pays:'France'},gps:null,points:[],np:0,nd:0,cover:''};
      await DB.put('reps',r);openLieu(r.id)})};
  $('#bLieuIa').onclick=()=>aiSheet('lieu');
  if($('#bProf'))$('#bProf').onclick=editProfil;
  if($('#bSyn'))$('#bSyn').onclick=()=>go('syn');
}

/* ---------- Formulaire ---------- */
function field([k,l,t,o],d,pre='',cmp){
  const v=d[k]??'',w=o==='wide'||t==='textarea'?' wide':'',id=pre+k;
  const cv=cmp&&(cmp[k]||cmp[k+'_d'])?`<div class="cur">Fiche actuelle : ${esc([cmp[k],cmp[k+'_d']].filter(Boolean).join(' — '))}</div>`:'';
  let c;
  if(t==='textarea')c=`<textarea id="${id}" data-k="${k}">${esc(v)}</textarea>`;
  else if(t==='select')c=`<select id="${id}" data-k="${k}"><option value=""></option>${o.map(x=>{const [a,b]=Array.isArray(x)?x:[x,x];return `<option value="${esc(a)}"${a===v?' selected':''}>${esc(b)}</option>`}).join('')}</select>`;
  else if(t==='yn')return `<div class="f${w}"><label id="${id}_l">${esc(l)}</label>${cv}<div class="seg" data-k="${k}" role="group" aria-labelledby="${id}_l">${['Oui','Non','En partie'].map(x=>`<button type="button" data-v="${x}" class="${x===v?'on':''}" aria-pressed="${x===v}">${x}</button>`).join('')}</div><input data-k="${k}_d" value="${esc(d[k+'_d']??'')}" placeholder="Précisions" aria-label="${esc(l)} : précisions"></div>`;
  else c=`<input id="${id}" data-k="${k}" type="${t==='dec'?'number':t}" value="${esc(v)}"${k==='ville'?' list="dlLieux" autocomplete="off"':''}${t==='number'?' inputmode="numeric" min="0"':t==='dec'?' inputmode="decimal" min="0" step="any"':''}>`;
  return `<div class="f${w}"><label for="${id}">${esc(l)}</label>${cv}${c}</div>`;
}
function bindFields(root,d,after){
  $$('[data-k]',root).forEach(e=>{
    if(e.classList.contains('seg'))$$('button',e).forEach(b=>b.onclick=()=>{const on=b.classList.contains('on');$$('button',e).forEach(x=>{x.classList.remove('on');x.setAttribute('aria-pressed','false')});
      if(on)delete d[e.dataset.k];else{b.classList.add('on');b.setAttribute('aria-pressed','true');d[e.dataset.k]=b.dataset.v}after&&after()});
    else e.oninput=()=>{d[e.dataset.k]=e.value;after&&after(e)}});
}
/* suggestions de lieux : ceux déjà saisis sur les autres sites */
async function fillLieux(){let d=$('#dlLieux');if(!d){d=document.createElement('datalist');d.id='dlLieux';document.body.appendChild(d)}
  const L=[...new Set((await live('reps')).map(fixRep).filter(r=>!r.ctiId).map(r=>String(r.d.ville||'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'fr'));d.innerHTML=L.map(x=>`<option value="${esc(x)}">`).join('')}
function renderEdit(){fillLieux();
  const open=new Set($$('details.sec[open]').map(e=>e.dataset.s));if(!open.size&&!cur.d.type)open.add('id');if(OPEN.has('pts')){open.add('pts');OPEN.delete('pts')}
  $('#main').innerHTML=SCHEMA.map((s,i)=>`<details class="sec" data-s="${s.k}"${open.has(s.k)?' open':''}><summary><span class="ico">${s.ico}</span>${esc(s.t)}<span class="cnt" data-c="${s.k}"></span></summary>
   <div class="body"><div class="grid">${s.f.map(f=>field(f,cur.d)).join('')}</div>${s.k==='id'?'<div id="gpsBox"></div>':''}</div></details>
   ${i===0?`<details class="sec" data-s="pts"${open.has('pts')?' open':''}><summary><span class="ico">📍</span>Étapes de la visite et photos<span class="cnt" data-c="pts"></span></summary><div class="body" id="ptsBox"></div></details>
   <details class="sec" data-s="docs"${open.has('docs')?' open':''}><summary><span class="ico">📎</span>Documents joints<span class="cnt" data-c="docs"></span></summary><div class="body" id="docsBox"></div></details>`:''}`).join('')
   +`<details class="sec" data-s="bud"${open.has('bud')?' open':''}><summary><span class="ico">💶</span>Budget partiel du site<span class="cnt" data-c="bud"></span></summary><div class="body"><div id="budBox"></div><div id="budTar"></div></div></details>
   <details class="sec" data-s="uses"${open.has('uses')?' open':''}><summary><span class="ico">🔗</span>Sites à visiter, circuits et repérages liés<span class="cnt" data-c="uses"></span></summary><div class="body" id="usesBox"></div></details>
   <div class="row" style="margin:18px 0"><button class="btn danger sm" id="bDel">Supprimer ce site</button></div>`;
  bindFields($('#main'),cur.d,e=>{save();counts();if(e&&e.dataset.k==='site')$('#ttl').firstChild.textContent=e.value||'Nouveau repérage'});
  drawGps();drawPoints();drawDocs();drawBud();drawUses();counts();
  $('#bDel').onclick=async()=>{const lieu=cur,used=await usesOfLieu(lieu.id);if(cur!==lieu)return;
    confirmBox('Supprimer ce site ?',(used.vis.length?'ATTENTION : le discours de visite de ce site ('+used.vis.slice(0,3).map(c=>c.nom||'sans titre').join(', ')+') devra être rattaché à un autre site.\n\n':'')+(used.cir.length?'ATTENTION : ce site figure dans '+used.cir.length+' circuit(s) ('+used.cir.slice(0,4).map(c=>c.titre||'sans titre').join(', ')+'). Ils afficheront « site supprimé » tant que vous ne l\'aurez pas restauré ou remplacé.\n\n':'')+'La fiche, ses photos et ses documents partent à la corbeille. Vous pourrez la restaurer pendant 30 jours depuis le menu.','Mettre à la corbeille',async()=>{
      cur.deleted=Date.now();await save(true);go(editBack||'list');toast('Lieu mis à la corbeille')})};
}
function counts(){
  SCHEMA.forEach(s=>{const n=filled(s),e=$(`[data-c="${s.k}"]`);if(e){e.textContent=n+'/'+s.f.length;e.classList.toggle('full',n>0)}});
  const p=$('[data-c="pts"]'),n=photos().length;if(p){p.textContent=`${cur.points.length} étape${cur.points.length>1?'s':''} · ${n} photo${n>1?'s':''}`;p.classList.toggle('full',n+cur.points.length>0)}
  const bc=$('[data-c="bud"]');if(bc){bc.textContent=cur.bud.length;bc.classList.toggle('full',cur.bud.length>0)}
  const dc=$('[data-c="docs"]');if(dc){dc.textContent=docs().length;dc.classList.toggle('full',docs().length>0)}
  if(summary(cur,files))save();
}
function drawGps(){
  const b=$('#gpsBox');if(!b)return;
  b.innerHTML=`<div class="gps"><span class="grow">${cur.gps?`📌 <b>${gpsTxt(cur.gps)}</b> · <a href="${esc(gpsUrl(cur.gps))}" target="_blank" rel="noopener">Voir sur la carte</a>`:'Position GPS du site non relevée'}</span>
   <button class="btn sm" id="bGps">${cur.gps?'Actualiser':'📌 Relever ma position'}</button></div>`;
  $('#bGps').onclick=async e=>{const rep=cur;e.target.textContent='Recherche…';
    try{rep.gps=await getGPS();await saveRep(rep);toast('Position enregistrée')}catch(x){toast(x.message,4000)}if(cur===rep&&view==='edit')drawGps()};
}
function confirmBox(t,m,ok,fn){
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(t)}"><div class="sheet"><h2>${esc(t)}</h2><p class="mute" style="white-space:pre-wrap">${esc(m)}</p><div class="row" style="margin-top:14px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn danger grow" id="mOk">${esc(ok)}</button></div></div></div>`;
  $('#mNo').onclick=closeModal;$('#mOk').onclick=()=>{closeModal();fn()};$('#mNo').focus();
}
const closeModal=()=>{$('#modal').innerHTML=''};
$('#modal').addEventListener('click',e=>{if(e.target.classList.contains('modal'))closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#modal').firstChild)closeModal()});
/* ---------- Étapes de la visite ---------- */
function grid(pid){const L=photos(pid);return L.length?`<div class="ph">${L.map(f=>`<figure data-f="${esc(f.id)}" role="button" tabindex="0"><img src="${urlOf(f)}" alt="${esc(f.cap||'Photo')}" loading="lazy">${f.cap?`<figcaption>${esc(f.cap)}</figcaption>`:''}</figure>`).join('')}</div>`:''}
function drawPoints(){
  const b=$('#ptsBox');if(!b)return;
  b.innerHTML=`<p class="mute" style="margin:12px 0 0">Découpez la visite en étapes (entrée, cour, salle, point de vue…). Chaque photo est rangée dans son étape, avec l'heure et la position GPS de la prise de vue.</p>
  <div class="pt"><div class="hd"><span class="num" style="background:var(--pri);color:var(--pri-ink)">★</span><b class="grow">Vues générales du site</b><button class="mini" data-cam="" aria-label="Photographier">📷</button></div>${grid('')}</div>
  ${cur.points.map((p,i)=>`<div class="pt" data-p="${esc(p.id)}"><div class="hd"><span class="num">${i+1}</span><input data-k="nom" value="${esc(p.nom||'')}" placeholder="Nom de l'étape" aria-label="Nom de l'étape">
   <button class="mini" data-cam="${esc(p.id)}" aria-label="Photographier cette étape">📷</button></div>
   <div class="grid"><div class="f wide"><label>Observations, éléments à commenter</label><textarea data-k="note">${esc(p.note||'')}</textarea></div>
   <div class="f"><label>Temps à prévoir (minutes)</label><input data-k="duree" type="number" inputmode="numeric" min="0" value="${esc(p.duree||'')}"></div></div>
   ${grid(p.id)}
   <div class="row" style="margin-top:10px;font-size:13px"><span class="grow mute">${p.gps?`📌 <a href="${esc(gpsUrl(p.gps))}" target="_blank" rel="noopener" style="color:var(--pri)">${gpsTxt(p.gps)}</a>`:'Position non relevée'}</span>
   <button class="mini" data-act="gps" aria-label="Relever la position">📌</button><button class="mini" data-act="up" aria-label="Monter"${i?'':' disabled'}>↑</button><button class="mini" data-act="dn" aria-label="Descendre"${i<cur.points.length-1?'':' disabled'}>↓</button><button class="mini" data-act="rm" aria-label="Supprimer l'étape">🗑</button></div></div>`).join('')}
  <div class="row" style="margin-top:12px"><button class="btn sec grow" id="bPt">＋ Ajouter une étape</button></div>`;
  $$('.pt[data-p]',b).forEach(el=>{const p=cur.points.find(x=>x.id===el.dataset.p),i=cur.points.indexOf(p);
    bindFields(el,p,()=>save());
    $$('[data-act]',el).forEach(bt=>bt.onclick=async()=>{const a=bt.dataset.act,rep=cur;
      if(a==='gps'){bt.textContent='…';try{p.gps=await getGPS();toast('Position de l\'étape enregistrée')}catch(x){toast(x.message,4000)}
        await saveRep(rep);if(cur===rep&&view==='edit')drawPoints();return}
      if(a==='up')cur.points.splice(i-1,0,cur.points.splice(i,1)[0]);
      if(a==='dn')cur.points.splice(i+1,0,cur.points.splice(i,1)[0]);
      if(a==='rm'){const n=photos(p.id).length;return confirmBox('Supprimer cette étape ?',n?`Ses ${n} photo(s) seront reclassées dans les vues générales.`:'Cette étape sera retirée de la fiche.','Supprimer',async()=>{
        for(const f of photos(p.id)){f.pointId='';await DB.put('files',f)}cur.points.splice(i,1);save(true);drawPoints();counts()})}
      save(true);drawPoints()})});
  $$('[data-cam]',b).forEach(bt=>bt.onclick=()=>shoot(bt.dataset.cam));
  $$('figure[data-f]',b).forEach(e=>{e.onclick=()=>viewPhoto(e.dataset.f);e.onkeydown=k=>{if(k.key==='Enter')viewPhoto(e.dataset.f)}});
  $('#bPt').onclick=()=>addPoint();
}
function addPoint(){
  const rep=cur,p={id:uid(),nom:'',note:'',duree:'',gps:null};cur.points.push(p);lastPoint=p.id;save(true);
  const d=$('details[data-s="pts"]');d.open=true;drawPoints();counts();
  const el=$(`.pt[data-p="${CSS.escape(p.id)}"]`);el.scrollIntoView({behavior:'smooth',block:'center'});$('input',el).focus({preventScroll:true});
  getGPS(8000).then(g=>{if(!rep.points.includes(p))return;p.gps=g;saveRep(rep);if(cur===rep&&view==='edit')drawPointsKeep()}).catch(()=>{});
}
/* redessine sans perdre la saisie en cours */
function drawPointsKeep(){const a=document.activeElement,pt=a&&a.closest&&a.closest('.pt[data-p]');if(pt&&$('#ptsBox').contains(a)){const k=a.dataset.k,id=pt.dataset.p,pos=a.selectionStart;drawPoints();const n=$(`.pt[data-p="${CSS.escape(id)}"] [data-k="${k}"]`);if(n){n.focus({preventScroll:true});try{n.setSelectionRange(pos,pos)}catch(e){}}}else drawPoints()}

/* ---------- Photos ---------- */
let target='';
function shoot(pid,lib){target=pid||'';lastPoint=pid||null;const i=$(lib?'#fLib':'#fCam');i.value='';i.click()}
function askPhoto(){
  const opts=[['','Vues générales du site'],...cur.points.map((p,i)=>[p.id,`${i+1}. ${p.nom||'Étape sans nom'}`])];
  $('#modal').innerHTML=`<div class="modal"><div class="sheet"><h2>Ajouter une photo</h2>
   <div class="f"><label for="selPt">Ranger dans</label><select id="selPt">${opts.map(([v,l])=>`<option value="${esc(v)}"${v===(lastPoint||'')?' selected':''}>${esc(l)}</option>`).join('')}</select></div>
   <div class="row" style="margin-top:14px"><button class="btn acc grow" id="mCam">📷 Prendre une photo</button><button class="btn sec grow" id="mLib">🖼 Photothèque</button></div>
   <div class="row" style="margin-top:10px"><button class="btn sec grow" id="mNo">Fermer</button></div></div></div>`;
  $('#mCam').onclick=()=>{const v=$('#selPt').value;closeModal();shoot(v)};
  $('#mLib').onclick=()=>{const v=$('#selPt').value;closeModal();shoot(v,true)};
  $('#mNo').onclick=closeModal;
}
async function shrink(file,max=1800){
  let bmp;try{bmp=await createImageBitmap(file,{imageOrientation:'from-image'})}catch(e){
    bmp=await new Promise((ok,ko)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=()=>ko(new Error('Image illisible'));im.src=URL.createObjectURL(file)})}
  const k=Math.min(1,max/Math.max(bmp.width,bmp.height)),w=Math.round(bmp.width*k),h=Math.round(bmp.height*k);
  const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(bmp,0,0,w,h);
  const blob=await new Promise(ok=>c.toBlob(ok,'image/jpeg',.85));if(!blob)throw new Error('Image illisible');
  return {blob,w,h};
}
async function addPhotos(list,lib){
  if(!list.length||!cur)return;const rep=cur,pid=rep.points.some(p=>p.id===target)?target:'';toast('Enregistrement de la photo…',8000);
  const gp=lib?Promise.resolve(null):getGPS(7000).catch(()=>null);let n=0;
  for(const file of list){try{const {blob,w,h}=await shrink(file);
    const f={id:uid(),repId:rep.id,kind:'photo',pointId:pid,name:String(file.name||'photo'),type:'image/jpeg',blob,w,h,cap:'',t:(lib&&file.lastModified)||Date.now()+n,lib:!!lib,gps:null};
    await DB.put('files',f);if(cur===rep)files.push(f);n++;gp.then(g=>{if(g){f.gps=g;DB.put('files',f).catch(()=>{})}})}catch(e){toast('Photo non enregistrée : '+((e&&e.message)||'espace insuffisant ?'),5000)}}
  if(!n)return;
  if(cur===rep&&view==='edit'){$('details[data-s="pts"]').open=true;drawPointsKeep();counts();save(true)}
  else{delete rep.np;saveRep(rep)}   /* l'utilisateur a changé d'écran : la photo reste rangée dans SA fiche */
  toast(n>1?n+' photos ajoutées':'Photo ajoutée');
}
$('#fCam').onchange=e=>addPhotos([...e.target.files],false);
$('#fLib').onchange=e=>addPhotos([...e.target.files],true);
function viewPhoto(id){
  const f=files.find(x=>x.id===id);if(!f)return;
  const opts=[['','Vues générales du site'],...cur.points.map((p,i)=>[p.id,`${i+1}. ${p.nom||'Étape sans nom'}`])];
  $('#modal').innerHTML=`<div class="modal"><div class="sheet"><img class="big" src="${urlOf(f)}" alt="">
   <p class="mute" style="margin:8px 0 0">${f.lib?'Image importée, datée du ':'Prise le '}${new Date(f.t).toLocaleString('fr-FR',{dateStyle:'short',timeStyle:'short'})}${f.gps?` · 📌 <a href="${esc(gpsUrl(f.gps))}" target="_blank" rel="noopener" style="color:var(--pri)">${gpsTxt(f.gps)}</a>`:''}</p>
   <div class="f"><label for="pCap">Légende</label><input id="pCap" value="${esc(f.cap||'')}" placeholder="Ce que montre la photo"></div>
   <div class="f"><label for="pPt">Rangée dans</label><select id="pPt">${opts.map(([v,l])=>`<option value="${esc(v)}"${v===(f.pointId||'')?' selected':''}>${esc(l)}</option>`).join('')}</select></div>
   <div class="row" style="margin-top:14px"><button class="btn danger" id="pDel">Supprimer</button><button class="btn grow" id="pOk">Terminé</button></div></div></div>`;
  $('#pOk').onclick=async()=>{f.cap=$('#pCap').value.trim();f.pointId=$('#pPt').value;await DB.put('files',f);closeModal();drawPoints()};
  $('#pDel').onclick=()=>confirmBox('Supprimer cette photo ?','Cette suppression est définitive.','Supprimer',async()=>{await DB.del('files',f.id);files=files.filter(x=>x!==f);drawPoints();counts()});
}

/* ---------- Documents joints ---------- */
const human=n=>n>1048576?(n/1048576).toFixed(1).replace('.',',')+' Mo':Math.max(1,Math.round(n/1024))+' ko';
function drawDocs(){
  const b=$('#docsBox');if(!b)return;const L=docs();
  b.innerHTML=`<p class="mute" style="margin:12px 0 4px">Dépliant scanné, grille tarifaire, plan, bon de réservation : PDF, image ou autre fichier.</p>
   ${L.map(f=>`<div class="doc"><span>${/pdf/.test(f.type)?'📕':/image/.test(f.type)?'🖼':'📄'}</span><span class="n" data-o="${esc(f.id)}">${esc(f.name)}</span><span class="mute">${human(f.blob.size)}</span><button class="mini" data-x="${esc(f.id)}" aria-label="Supprimer">🗑</button></div>`).join('')}
   <div class="row" style="margin-top:12px"><button class="btn sec grow" id="bDoc">＋ Joindre un document</button></div>`;
  $('#bDoc').onclick=()=>{const i=$('#fDoc');i.value='';i.click()};
  $$('[data-o]',b).forEach(e=>{e.setAttribute('role','button');e.tabIndex=0;e.onkeydown=k=>{if(k.key==='Enter')e.click()};e.onclick=()=>{const f=files.find(x=>x.id===e.dataset.o);if(!f)return;
    if(!OPENABLE.test(f.blob.type))return deliver(new Blob([f.blob],{type:'application/octet-stream'}),f.name||'document');
    const a=document.createElement('a');a.href=urlOf(f);a.target='_blank';a.rel='noopener noreferrer';document.body.append(a);a.click();a.remove()}});
  $$('[data-x]',b).forEach(e=>e.onclick=()=>{const f=files.find(x=>x.id===e.dataset.x);confirmBox('Retirer ce document ?',f.name,'Retirer',async()=>{await DB.del('files',f.id);files=files.filter(x=>x!==f);drawDocs();counts()})});
}
$('#fDoc').onchange=async e=>{if(!cur)return;const rep=cur;let n=0;
  for(const file of [...e.target.files]){if(file.size>40*1048576){toast(`« ${file.name} » dépasse 40 Mo : non joint`,4500);continue}
    const ty=safeType(file.type,'doc'),f={id:uid(),repId:rep.id,kind:'doc',name:String(file.name||'document'),type:ty,blob:file.slice(0,file.size,ty),t:Date.now()+n};
    try{await DB.put('files',f);if(cur===rep)files.push(f);n++}catch(x){toast('Document non enregistré : espace insuffisant ?',4500)}}
  if(!n)return;
  if(cur===rep&&view==='edit'){$('details[data-s="docs"]').open=true;drawDocs();counts();save(true)}else{delete rep.np;saveRep(rep)}
  toast(n>1?n+' documents joints':'Document joint')};

/* ---------- Barre d'actions ---------- */
$$('#bar button').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
  if(a==='photo')askPhoto();
  if(a==='point')addPoint();
  if(a==='doc'){const i=$('#fDoc');i.value='';i.click()}
  if(a==='report')go('report')});

/* ---------- Profil du guide ---------- */
function editProfil(){
  const d={...profil,...profilId()};
  $('#modal').innerHTML=`<div class="modal"><div class="sheet"><h2>Mon profil de guide</h2><p class="mute">Repris en tête de chaque compte-rendu. Ces informations restent sur cet appareil. Le prénom et le nom sont ceux du titulaire de la licence : ils ne se modifient pas ici.</p>
   <div class="grid" id="pf">${PROFIL.map(f=>field(f,d,'pf_')).join('')}</div>
   <div class="row" style="margin-top:16px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn grow" id="mOk">Enregistrer</button></div></div></div>`;
  bindFields($('#pf'),d);$$('#pf input').forEach(i=>{if(/_(prenom|nom)$/.test(i.id||'')){i.readOnly=true;i.setAttribute('aria-readonly','true');i.style.opacity='.75'}});$('#mNo').onclick=closeModal;
  $('#mOk').onclick=async()=>{profil=d;await DB.put('kv',profil,'profil');modTouch();closeModal();toast('Profil enregistré');if(view==='list')renderList()};
}
/* ---------- Compte-rendu : un modèle unique, rendu en HTML (écran, PDF) et en Word ---------- */
const val=(d,[k,,t])=>t==='yn'?[d[k],d[k+'_d']].filter(Boolean).join(' — '):t==='date'?frDate(d[k]):String(d[k]??'').trim();
function model(r,fl){
  const d=r.d,B=[],ph=pid=>fl.filter(f=>f.kind==='photo'&&(pid===undefined||(f.pointId||'')===pid)).sort((a,b)=>a.t-b.t);
  B.push({h1:d.site||'Site sans nom'},{meta:['Compte-rendu de repérage',d.type,[d.cp,d.ville].filter(Boolean).join(' '),d.date&&'repérage du '+frDate(d.date)].filter(Boolean).join(' · ')});
  const g=PROFIL.map(f=>[f[1],val(profil,f)]).filter(x=>x[1]);
  if(g.length)B.push({h2:'Guide'},{table:[['Guide',[profil.prenom,profil.nom].filter(Boolean).join(' ')],...g.filter(x=>!['Prénom','Nom'].includes(x[0]))].filter(x=>x[1])});
  SCHEMA.forEach((s,i)=>{
    if(s.k==='not'){if(d.notes)B.push({h2:s.t},{p:d.notes});return}
    const rows=s.f.map(f=>[f[1],val(d,f)]).filter(x=>x[1]);
    if(i===0&&r.gps)rows.push(['Coordonnées GPS',gpsTxt(r.gps)]);
    if(rows.length)B.push({h2:s.t},{table:rows});
    if(i===0){
      const gen=ph('');if(gen.length)B.push({h2:'Vues générales'},{pics:gen});
      if(r.points.length){const tot=r.points.reduce((a,p)=>a+(+p.duree||0),0);
        B.push({h2:'Déroulé de la visite'+(tot?` (${tot} min au total)`:'')});
        r.points.forEach((p,n)=>{B.push({h3:`${n+1}. ${p.nom||'Étape sans nom'}`+(p.duree?` — ${p.duree} min`:'')});
          if(p.note)B.push({p:p.note});if(p.gps)B.push({small:'GPS : '+gpsTxt(p.gps)});
          const L=ph(p.id);if(L.length)B.push({pics:L})})}}});
  const dc=fl.filter(f=>f.kind==='doc');
  if(dc.length)B.push({h2:'Documents joints'},{p:dc.map(f=>'• '+f.name).join('\n')});
  B.push({small:'Compte-rendu établi avec Tiango – tiango.fr'});
  return B;
}
const capOf=f=>f.cap||new Date(f.t).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
function toHTML(B){return B.map(b=>b.h1?`<h1>${esc(b.h1)}</h1>`:b.meta?`<div class="meta">${esc(b.meta)}</div>`:b.h2?`<h2>${esc(b.h2)}</h2>`:b.h3?`<h3>${esc(b.h3)}</h3>`:
  b.p?`<p>${esc(b.p)}</p>`:b.small?`<p style="font-size:12px;color:#63747b">${esc(b.small)}</p>`:
  b.table?`<table>${b.table.map(([l,v])=>`<tr><td>${esc(l)}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table>`:
  b.grid?gridHTML(b.grid):b.pics?`<div class="pics">${b.pics.map(f=>`<figure><img src="${urlOf(f)}" alt=""><figcaption>${esc(capOf(f))}</figcaption></figure>`).join('')}</div>`:'').join('')}
function renderReport(){
  const name=slug(cur.d.site)+(cur.d.date?'_'+cur.d.date:'');
  $('#main').innerHTML=`<div class="card noprint"><div class="row">
    <button class="btn grow" id="xPdf">PDF / Imprimer</button><button class="btn grow" id="xDoc">Word (.docx)</button><button class="btn sec grow" id="xBak">Sauvegarde</button></div>
    <p class="mute" style="margin:10px 0 0">PDF : dans la fenêtre d'impression, choisissez « Enregistrer en PDF » (sur iPhone/iPad : bouton Partager de l'aperçu). La sauvegarde est le fichier à ouvrir sur un autre appareil pour retrouver la fiche complète, photos et documents compris.</p></div>
    <div class="cr">${toHTML(model(cur,files))}</div>`;
  $('#xPdf').onclick=()=>{const t=document.title;document.title=name;window.print();setTimeout(()=>document.title=t,1000)};
  $('#xDoc').onclick=async e=>{e.target.disabled=true;e.target.textContent='Préparation…';try{deliver(await toDocx(model(cur,files)),name+'.docx')}catch(x){toast('Export Word impossible : '+x.message,5000)}e.target.disabled=false;e.target.textContent='Word (.docx)'};
  $('#xBak').onclick=()=>backup([cur],name+'.tiango.json');
}

/* ---------- Synthèse pour bâtir un circuit ---------- */
const SYN=[['Site',r=>r.d.site],['Commune',r=>r.d.ville],['Repéré le',r=>frDate(r.d.date)],['Durée (min)',r=>r.d.c_duree||r.points.reduce((a,p)=>a+(+p.duree||0),0)||''],
 ['Horaires',r=>r.d.h_haute],['Fermeture',r=>r.d.h_ferm],['Tarif groupe',r=>r.d.t_grp],['Réservation',r=>val(r.d,['t_resa',,'yn'])],
 ['Guide-conférencier exigé',r=>val(r.d,['g_conf',,'yn'])],['Parking cars',r=>[val(r.d,['a_car',,'yn']),r.d.a_car_d].filter(Boolean).join(' — ')],
 ['Accès fauteuil',r=>val(r.d,['p_acc',,'yn'])],['Créneau conseillé',r=>r.d.c_creneau],['Appréciation',r=>(r.d.c_note||'').split(' ')[0]],['GPS',r=>r.gps?`${r.gps.lat.toFixed(5)}, ${r.gps.lon.toFixed(5)}`:'']];
async function renderSyn(){
  const reps=(await live('reps')).map(fixRep).sort((a,b)=>String(a.d.date||'').localeCompare(String(b.d.date||'')));
  $('#main').innerHTML=`<div class="card noprint"><div class="row"><button class="btn grow" id="sPdf">PDF / Imprimer</button><button class="btn sec grow" id="sCsv">Tableur (.csv)</button></div>
   <p class="mute" style="margin:10px 0 0">Tous vos repérages côte à côte, pour ordonner les étapes d'un circuit. Le fichier .csv s'ouvre dans Excel ou Numbers. Pour l'impression, choisissez le format paysage.</p></div>
   <div class="cr" style="overflow-x:auto"><h1>Synthèse des repérages</h1><div class="meta">${reps.length} sites${profil.nom?' · '+esc([profil.prenom,profil.nom].filter(Boolean).join(' ')):''}</div>
   <table class="syn"><tr>${SYN.map(c=>`<th>${c[0]}</th>`).join('')}</tr>${reps.map(r=>`<tr>${SYN.map(c=>`<td>${esc(c[1](r)??'')}</td>`).join('')}</tr>`).join('')}</table></div>`;
  $('#sPdf').onclick=()=>window.print();
  $('#sCsv').onclick=()=>{const q=v=>{v=String(v??'');if(/^[=+\-@\t\r]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"'};
    deliver(new Blob(['﻿'+[SYN.map(c=>q(c[0])).join(';'),...reps.map(r=>SYN.map(c=>q(c[1](r))).join(';'))].join('\r\n')],{type:'text/csv'}),'synthese-reperages.csv')};
}

/* ---------- Remise d'un fichier : partage (iPhone, iPad, Android) ou téléchargement ---------- */
async function deliver(blob,name){
  const file=new File([blob],name,{type:blob.type});
  if(matchMedia('(pointer:coarse)').matches&&navigator.canShare&&navigator.canShare({files:[file]})){
    try{await navigator.share({files:[file]});return true}catch(e){if(e.name==='AbortError')return false}
    /* iOS refuse le partage quand la préparation a duré (geste de l'utilisateur expiré) : on demande un appui, qui le rétablit */
    return shareSheet(file,blob,name)}
  return download(blob,name);
}
function download(blob,name){
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),60000);toast('Fichier enregistré : '+name);return true}
function shareSheet(file,blob,name){return new Promise(res=>{
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Fichier prêt"><div class="sheet"><h2>Fichier prêt</h2><p class="mute">« ${esc(name)} » (${human(blob.size)}). Appuyez sur le bouton, puis choisissez « Enregistrer dans Fichiers », AirDrop ou votre messagerie.</p><div class="row" style="margin-top:14px"><button class="btn sec grow" id="shNo">Annuler</button><button class="btn acc grow" id="shGo">Enregistrer le fichier</button></div></div></div>`;
  $('#shNo').onclick=()=>{closeModal();res(false)};
  $('#shGo').onclick=async()=>{try{await navigator.share({files:[file]});closeModal();res(true)}catch(e){if(e.name==='AbortError')return;closeModal();toast('Partage impossible : '+((e&&e.message)||e.name)+'. Téléchargement du fichier…',5000);res(download(blob,name))}}})}

/* ---------- Archive ZIP minimale (sans compression), pour fabriquer le .docx ---------- */
const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c}return t})();
const crc32=u=>{let c=-1;for(let i=0;i<u.length;i++)c=CRC[(c^u[i])&255]^(c>>>8);return(c^-1)>>>0};
function zip(entries,type){ /* entries : [nom, Uint8Array] */
  const enc=new TextEncoder(),parts=[],cd=[];let off=0;
  for(const [n,u] of entries){const nm=enc.encode(n),crc=crc32(u),h=new DataView(new ArrayBuffer(30));
    h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(6,0x800,true);h.setUint16(8,0,true);h.setUint32(10,0x00210000,true);
    h.setUint32(14,crc,true);h.setUint32(18,u.length,true);h.setUint32(22,u.length,true);h.setUint16(26,nm.length,true);
    parts.push(h.buffer,nm,u);
    const c=new DataView(new ArrayBuffer(46));c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x800,true);
    c.setUint32(12,0x00210000,true);c.setUint32(16,crc,true);c.setUint32(20,u.length,true);c.setUint32(24,u.length,true);c.setUint16(28,nm.length,true);c.setUint32(42,off,true);
    cd.push(c.buffer,nm);off+=30+nm.length+u.length}
  const size=cd.reduce((a,b)=>a+b.byteLength,0),e=new DataView(new ArrayBuffer(22));
  e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,size,true);e.setUint32(16,off,true);
  return new Blob([...parts,...cd,e.buffer],{type});
}
/* ================= SUITE TIANGO : outils communs aux espaces CTI, sites à visiter et Budgets ================= */
const num=v=>{const n=parseFloat(String(v??'').replace(',','.'));return isFinite(n)&&n>0?n:0};   /* jamais négatif ni NaN */
const blank=v=>v===undefined||v===null||String(v).trim()==='';
const eur=n=>(Math.round(n*100)/100).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
const mins=n=>n>=60?Math.floor(n/60)+' h'+(n%60?' '+String(n%60).padStart(2,'0'):''):n+' min';
const LANGS={fr:'Français',en:'English',es:'Español',de:'Deutsch',it:'Italiano',pt:'Português',nl:'Nederlands'};
const lname=c=>LANGS[c]||String(c).toUpperCase();
const OPEN=new Set();
const sec=(k,ico,t,body,cnt='')=>`<details class="sec" data-o="${k}"${OPEN.has(k)?' open':''}><summary><span class="ico">${ico}</span>${esc(t)}<span class="cnt${cnt!==''&&cnt!=='0'?' full':''}" data-n="${k}">${cnt}</span></summary><div class="body">${body}</div></details>`;
const bindSecs=()=>$$('details.sec[data-o]').forEach(d=>d.ontoggle=()=>d.open?OPEN.add(d.dataset.o):OPEN.delete(d.dataset.o));
const setCnt=(k,v)=>{const e=$(`[data-n="${k}"]`);if(e){e.textContent=v;e.classList.toggle('full',!!v&&v!=='0')}};
function gridHTML(g){const tx=c=>c&&typeof c==='object'?c:{t:c};
  return `<div style="overflow-x:auto"><table class="syn"><tr>${g.head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr>${g.rows.map(r=>`<tr>${r.map(c=>{c=tx(c);return `<td${c.fill?' class="y"':''} style="white-space:pre-wrap${c.b?';font-weight:700':''}">${esc(c.t)}</td>`}).join('')}</tr>`).join('')}</table></div>`}

/* ---------- Liste d'éléments éditables (étapes, modules, postes de coût…) ---------- */
function mlField([k,l,t],it,lang,tall){const v=(it[k]||{})[lang]||'';
  const a=` aria-label="${esc(l+' — '+lname(lang))}"`;return `<div class="f wide"><label>${esc(l)}<span class="lgs">${esc(lname(lang))}</span></label>${t==='ml'?`<textarea data-ml="${k}"${a}${tall?' style="min-height:220px"':''}>${esc(v)}</textarea>`:`<input data-ml="${k}"${a} value="${esc(v)}">`}</div>`}
let elN=0;
function editList(box,arr,spec,o={}){
  const pre='l'+(++elN)+'_',lang=()=>o.lang?o.lang():'fr',SV=o.save||saveItem;
  const upd=(el,it)=>{if(o.title)$('.ttl',el).textContent=o.title(it);if(o.extra)$('.xtra',el).innerHTML=o.extra(it);SV();o.after&&o.after()};
  const draw=()=>{
    box.innerHTML=(o.intro?`<p class="mute" style="margin:12px 0 0">${o.intro}</p>`:'')+arr.map((it,i)=>`<div class="pt" data-i="${i}"><div class="hd"><span class="num">${i+1}</span><b class="grow ttl" style="min-width:0;overflow:hidden;text-overflow:ellipsis">${esc(o.title?o.title(it):'')}</b>
      <button class="mini" data-m="up" aria-label="Monter"${i?'':' disabled'}>↑</button><button class="mini" data-m="dn" aria-label="Descendre"${i<arr.length-1?'':' disabled'}>↓</button><button class="mini" data-m="rm" aria-label="Supprimer">🗑</button></div>
      <div class="grid">${spec.map(s=>s[2]==='ml'||s[2]==='mlt'?mlField(s,it,lang(),s[3]==='tall'):field(s,it,pre+i+'_')).join('')}</div><div class="xtra">${o.extra?o.extra(it):''}</div></div>`).join('')
      +`<div class="row" style="margin-top:12px"><button class="btn sec grow" data-add>${o.add||'＋ Ajouter'}</button></div>`;
    $$('.pt',box).forEach(el=>{const i=+el.dataset.i,it=arr[i];
      bindFields(el,it,()=>upd(el,it));
      $$('[data-ml]',el).forEach(e=>e.oninput=()=>{(it[e.dataset.ml]=it[e.dataset.ml]||{})[lang()]=e.value;upd(el,it)});
      $$('[data-m]',el).forEach(b=>b.onclick=()=>{const m=b.dataset.m,mv=()=>{SV(true);draw();o.after&&o.after()};
        if(m==='up'){arr.splice(i-1,0,arr.splice(i,1)[0]);mv()}
        if(m==='dn'){arr.splice(i+1,0,arr.splice(i,1)[0]);mv()}
        if(m==='rm')confirmBox('Supprimer cet élément ?',(o.title&&o.title(it))||'Il sera retiré définitivement.','Supprimer',()=>{arr.splice(i,1);mv()})})});
    $('[data-add]',box).onclick=()=>{arr.push(o.blank?o.blank():{});SV(true);draw();o.after&&o.after();
      const el=$$('.pt',box).pop();el.scrollIntoView({behavior:'smooth',block:'center'});const f=$('input,textarea',el);f&&f.focus({preventScroll:true})};
  };
  draw();return draw;
}
/* liste à cocher */
function checkList(box,arr,o={}){
  const draw=()=>{box.innerHTML=(o.intro?`<p class="mute" style="margin:12px 0 0">${o.intro}</p>`:'')+arr.map((c,i)=>`<div class="chk" data-i="${i}"><input type="checkbox"${c.done?' checked':''} aria-label="Fait"><input type="text" value="${esc(c.t||'')}" placeholder="${esc(o.ph||'À faire')}"><button class="mini" aria-label="Supprimer">🗑</button></div>`).join('')
    +`<div class="row" style="margin-top:12px"><button class="btn sec grow" data-add>＋ Ajouter une ligne</button></div>`;
    $$('.chk',box).forEach(el=>{const c=arr[+el.dataset.i],[cb,tx]=$$('input',el);
      cb.onchange=()=>{c.done=cb.checked;saveItem();o.after&&o.after()};tx.oninput=()=>{c.t=tx.value;saveItem()};
      $('button',el).onclick=()=>{arr.splice(+el.dataset.i,1);saveItem(true);draw();o.after&&o.after()}});
    $('[data-add]',box).onclick=()=>{arr.push({t:'',done:false});saveItem(true);draw();o.after&&o.after();$$('.chk input[type=text]',box).pop().focus()}};
  draw();
}
const checksTxt=a=>a.filter(c=>c.t).map(c=>(c.done?'☑ ':'☐ ')+c.t).join('\n');

/* ---------- Listes d'accueil des trois espaces ---------- */
const KINDS={
  cti:{list:'ctiList',one:'CTI',ico:'🗺️',empty:'Aucun cadre technique d\'itinéraire',hint:'Créez le déroulé minuté d\'une prestation : trajets, arrêts, horaires, kilomètres.',add:'＋ Nouveau CTI',ai:true,
    title:i=>i.titre||'CTI sans titre',sub:i=>[i.sous,frDate(i.date)].filter(Boolean).join(' · '),pills:i=>[i.lignes.length+' ligne'+(i.lignes.length>1?'s':''),mins(i.lignes.reduce((a,l)=>a+num(l.duree),0))]},
  vis:{list:'visList',one:'discours',ico:'🎙️',empty:'Aucun discours de visite',hint:'Le discours se crée depuis la fiche d\'un site à visiter (onglet Sites), ou s\'importe ici : rédigé par une IA au format Tiango, il retrouve ou crée son site.',add:'＋ Nouveau discours',ai:true,
    title:i=>i.nom||'Discours sans titre',sub:i=>i._ln||'',pills:i=>[i._ln?'':'⚠ Site à choisir',i._miss?'⚠ '+i._miss+' point'+(i._miss>1?'s':'')+' sans discours':'',i.modules.length+' module'+(i.modules.length>1?'s':''),(i.langs||[]).map(l=>l.toUpperCase()).join(' · ')]},
  bud:{list:'budList',one:'budget',ico:'💶',empty:'Aucun budget',hint:'Détaillez les coûts d\'une prestation, puis fixez votre prix avec le module de marge.',add:'＋ Nouveau budget',
    title:i=>i.titre||'Budget sans titre',sub:i=>num(i.pax)?num(i.pax)+' participants payants':'',pills:i=>{const c=budCalc(i);return [eur(c.total)+' de coûts',c.prix?eur(c.prix)+' / pers.':'']}}
};
async function renderItems(kind){
  const K=KINDS[kind],L=(await live('items')).filter(i=>i.kind===kind).map(fixItem).sort((a,b)=>b.updated-a.updated);
  if(view!==K.list)return;
  if(kind==='vis'){const rl=(await live('reps')).map(fixRep),rm=new Map(rl.map(r=>[r.id,lieuNom(r)+(r.d.ville?' — '+r.d.ville:'')]));L.forEach(i=>{i._ln=rm.get(i.lieuId)||'';i._miss=visMiss(i,rl.find(r=>r.id===i.lieuId)).length});L.sort((a,b)=>(a._ln||'~').localeCompare(b._ln||'~','fr')||(a.nom||'').localeCompare(b.nom||'','fr'))}
  $('#main').innerHTML=`<div class="row" style="margin-top:14px"><button class="btn acc grow" id="iNew">${K.add}</button></div>
   ${K.ai?`<div class="row" style="margin-top:10px"><button class="btn sec grow" id="iAi">✨ Faire rédiger par une IA</button><button class="btn sec grow" id="iImp">📥 Importer</button></div>`:''}
   ${L.length?L.map(i=>`<div class="card rep" data-id="${esc(i.id)}"><div class="th">${K.ico}</div><div class="grow"><h3>${esc(K.title(i))}</h3><div class="mute">${esc(K.sub(i))}</div>${K.pills(i).filter(Boolean).map(p=>`<span class="pill">${esc(p)}</span>`).join('')}</div></div>`).join('')
     :`<div class="empty"><b>${K.empty}</b>${K.hint}</div>`}`;
  cards($('#main'),id=>go(kind,id));
  $('#iNew').onclick=async()=>{if(kind==='vis')return pickSite(discoursChoice);if(!(await gate(kind)))return;const it=NEW[kind]();await DB.put('items',it);go(kind,it.id)};
  if(K.ai){$('#iAi').onclick=()=>kind==='vis'?visAiStart():aiSheet(kind);$('#iImp').onclick=()=>importSheet()}
}
const NEW={
  cti:()=>({id:uid(),kind:'cti',updated:Date.now(),titre:'',sous:'',date:today(),debut:'09:00',fin:'',note:'',h:{guide:[profil.prenom,profil.nom].filter(Boolean).join(' '),urgences:'15 SAMU · 17 Police · 18 Pompiers · 112 · 196 CROSS (urgence en mer) · 114 (SMS, personnes sourdes et malentendantes)'},lignes:[],pieces:[],apres:[],accs:[],repId:'',contacts:[],circId:'',jour:'',ed:''}),
  vis:()=>({id:uid(),kind:'vis',updated:Date.now(),nom:'',lieu:'',type:'',public:'',angle:'',resume:'',langs:['fr','en','es'],modules:[],formules:[],secu:{},faq:[],anec:[],planb:[],nepas:[],gloss:[],sources:[],conf:[],fiche:[]}),
  bud:()=>({id:uid(),kind:'bud',updated:Date.now(),titre:'',pax:'20',acc:'1',ctiId:'',lignes:[],base:'pv',t1:'15',t2:'25',t3:'35',prix:'',arr:'1'})
};
function delItem(label){confirmBox('Supprimer '+label+' ?','L\'élément part à la corbeille. Vous pourrez le restaurer pendant 30 jours depuis le menu.','Mettre à la corbeille',async()=>{
  const back=VIEWS[view].back;item.deleted=Date.now();await saveItem(true);go(back);toast('Mis à la corbeille')})}
/* copie indépendante : nouveaux identifiants, liens vers le repérage de terrain remis à zéro */
async function dupItem(){if(!(await gate(item.kind)))return;await flushAll();const c=JSON.parse(JSON.stringify(item));c.id=uid();c.updated=Date.now();
  if(c.kind==='vis'||c.kind==='pre')c.nom=(c.nom||(c.kind==='vis'?'Discours':'Prestataire'))+' (copie)';else c.titre=(c.titre||({cti:'CTI',cir:'Circuit',rpg:'Repérage'}[c.kind]||'Budget'))+' (copie)';
  if(c.kind==='cir'){const m={};c.sejours.forEach(x=>{const n=uid();m[x.id]=n;x.id=n});c.jours.forEach(j=>{j.id=uid();j.sejId=m[j.sejId]||'';PARTS.forEach(([k])=>j.parts[k].forEach(e=>e.id=uid()))});c.bud.forEach(l=>l.id=uid())}
  if(c.kind==='cti'){c.contacts.forEach(k=>k.id=uid())}
  if(c.kind==='cti'){c.repId='';delete c.run;delete c.hist;c.lignes.forEach(l=>{l.id=uid();delete l.docs;delete l.obs;delete l.prevu;delete l.releve})}
  if(c.kind==='bud')c.lignes.forEach(l=>l.id=uid());
  await DB.put('items',c);toast('Copie créée');go(c.kind,c.id)}
const delBtn=`<div class="row" style="margin:18px 0"><button class="btn sec sm" id="iDup">Dupliquer</button><button class="btn danger sm" id="iDel">Supprimer</button></div>`;

/* ---------- Aperçu et exports communs (PDF, Word) ---------- */
let pv=null;   /* {title,name,blocks,landscape,back,extra} */
function preview(p){p.blocks=[...p.blocks,{small:licLine()}];pv=p;go('preview')}
VIEWS.preview={get back(){return pv.back},t:()=>esc(pv.title)+sub2('Aperçu avant export'),r(){
  $('#main').innerHTML=`<div class="card noprint"><div class="row"><button class="btn grow" id="xPdf">PDF / Imprimer</button><button class="btn grow" id="xDoc">Word (.docx)</button></div>
   ${pv.landscape?'<p class="mute" style="margin:10px 0 0">Document au format paysage : pour le PDF, choisissez l\'orientation « Paysage » dans la fenêtre d\'impression.</p>':''}</div>
   ${pv.landscape?'<style>@page{size:A4 landscape;margin:10mm}</style>':''}<div class="cr">${toHTML(pv.blocks)}</div>`;
  $('#xPdf').onclick=()=>{const t=document.title;document.title=pv.name;window.print();setTimeout(()=>document.title=t,1000)};
  $('#xDoc').onclick=async e=>{e.target.disabled=true;try{await deliver(await toDocx(pv.blocks,{landscape:pv.landscape}),pv.name+'.docx')}catch(x){toast('Export Word impossible : '+x.message,5000)}e.target.disabled=false};
}};
/* ================= ESPACE CTI : cadre technique d'itinéraire ================= */
const LT={pec:['Prise en charge','Prise en charge'],trajet:['Trajet','Déplacement + commentaire à bord'],arret:['Arrêt','Arrêt commenté'],pause:['Pause','Pause'],repas:['Repas','Repas'],libre:['Temps libre','Temps libre'],fin:['Fin de prestation','Fin de prestation / passage de témoin']};
/* Détail d'un arrêt : un site visité avec plusieurs modules (stations, pause, repas) devient une ligne par module dans le CTI */
const ctiSteps=(v,fo)=>v?(fo?fSeq(v,fo):v.modules.filter(m=>m.type!=='extension')):[];
function ctiSubs(l,v){
  const fo=l.fId&&v?v.formules.find(f=>f.id===l.fId):null,S=ctiSteps(v,fo),g=l.grp||l.id;
  return S.map((m,k)=>{
    const ty=m.type==='repas'?'repas':m.type==='pause'?'pause':'arret',nom=(m.lieu||m.code||'').trim();
    const s={id:uid(),type:ty,nature:LT[ty][1],lieu:ty==='arret'?[l.lieu,nom].filter(Boolean).join(' — '):(nom||LT[ty][0]),duree:String(num(m.duree)||''),repId:l.repId||'',visId:v.id,fId:fo?fo.id:'',modCode:(m.code||'').trim(),grp:g};
    if(k===0){Object.keys(l).forEach(x=>{if(!(x in s)&&x!=='orig')s[x]=l[x]});s.orig=JSON.parse(JSON.stringify(Object.assign({},l,{orig:undefined})))}
    return s})}
const ctiCanDetail=(l,v)=>!!v&&l.type==='arret'&&!l.modCode&&ctiSubs(l,v).filter(s=>num(s.duree)>0).length>=2;
function ctiDetail(c,i,v){const l=c.lignes[i];if(!ctiCanDetail(l,v))return false;c.lignes.splice(i,1,...ctiSubs(l,v));return true}
function ctiRegroup(c,g){
  const ix=c.lignes.map((l,i)=>l.grp===g?i:-1).filter(i=>i>=0);if(!ix.length)return false;
  const f=c.lignes[ix[0]],o=f.orig;
  const base=o?Object.assign({},o,{id:g}):{id:g,type:'arret',nature:LT.arret[1],lieu:String(f.lieu||'').split(' — ')[0],duree:String(ix.reduce((a,k)=>a+num(c.lignes[k].duree),0)||''),repId:f.repId||'',visId:f.visId||'',fId:f.fId||''};
  delete base.orig;base.modCode='';base.grp='';if(blank(base.duree))base.duree=String(ix.reduce((a,k)=>a+num(c.lignes[k].duree),0)||'');
  c.lignes.splice(ix[0],ix.length,base);return true}
const CTI_ID=[['titre','Intitulé de la prestation','text','wide'],['sous','Précision (ex. Jour 2 matin)','text'],['date','Date','date'],['debut','Heure de début','time'],['fin','Heure de fin imposée','time'],['note','Version / état du document','text','wide']];
const CTI_H=[['guide','Guide accompagnateur','text'],['prestation','Prestation (périmètre, durée)','textarea'],['clients','Clients (typologie)','textarea'],['effectif','Effectif','text'],
 ['transport','Moyen de transport','textarea'],['pec','Prise en charge (heure, lieu exact)','text'],['finlieu','Fin de prestation / passage de témoin','text'],
 ['maree','Marée','text'],['soleil','Lever et coucher du soleil','text'],['meteo','Météo et solution de repli','text'],['contacts','Contacts utiles','textarea'],['urgences','Urgences','textarea']];
/* effectif d'une étape : celui saisi sur l'étape, sinon le dernier connu plus haut, sinon l'effectif de l'en-tête */
function ctiEff(c,i){for(let k=i;k>=0;k--){const l=c.lignes[k];if(l&&!blank(l.eff))return String(l.eff).trim()}const m=/\d+/.exec(String(c.h.effectif||''));return m?m[0]:''}
const hm=m=>{m=((Math.round(m)%1440)+1440)%1440;return Math.floor(m/60)+'h'+String(m%60).padStart(2,'0')};
const t2m=s=>{const [h,m]=String(s||'').split(':');return (+h||0)*60+(+m||0)};
/* attente avant un horaire impératif : si l'on arrive en avance, l'étape ne commence qu'à l'heure fixée */
const impWait=(t,l)=>{if(!(l&&l.imp&&l.hfix))return 0;let x=t2m(l.hfix)-t;while(x>720)x-=1440;while(x<-720)x+=1440;return x>0?x:0};
function ctiCalc(c){let t=t2m(c.debut),km=0,dep=0,arr=0,wait=0;const rows=c.lignes.map(l=>{const w=impWait(t,l);t+=w;wait+=w;const d=num(l.duree),s=t;t+=d;km+=num(l.km);l.type==='trajet'?dep+=d:arr+=d;
    return {att:w,hor:d?hm(s)+' → '+hm(t):hm(s),km:l.type==='trajet'&&num(l.km)?String(num(l.km)).replace('.',',')+' / '+String(Math.round(km*10)/10).replace('.',','):'— / '+String(Math.round(km*10)/10).replace('.',',')}});
  const tot=dep+arr+wait;let prev=c.fin?t2m(c.fin)-t2m(c.debut):null;if(prev!==null&&prev<=0)prev+=1440;   /* une prestation peut finir après minuit */
  return {rows,dep,arr,wait,tot,km:Math.round(km*10)/10,prev,marge:prev===null?null:prev-tot,end:t}}
const ctiBilan=k=>`${mins(k.dep)} de déplacement + ${mins(k.arr)} d'arrêts`+(k.wait?` + ${mins(k.wait)} d'attente avant un horaire impératif`:'')+` = ${mins(k.tot)}`+(k.km?` · ${String(k.km).replace('.',',')} km`:'')+(k.prev===null?'':k.marge===0?' · sans marge sur l\'horaire imposé':k.marge>0?` · marge de ${mins(k.marge)}`:` · DÉPASSEMENT de ${mins(-k.marge)}`);
/* lever et coucher du soleil (algorithme de l'almanach, précision de l'ordre de la minute) */
function sunTimes(lat,lon,ds){const d=new Date(ds+'T12:00:00'),N=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5),r=Math.PI/180,out=[];
  for(const up of[true,false]){const lh=lon/15,t=N+((up?6:18)-lh)/24,M=.9856*t-3.289;let L=((M+1.916*Math.sin(M*r)+.02*Math.sin(2*M*r)+282.634)%360+360)%360;
    let RA=((Math.atan(.91764*Math.tan(L*r))/r)%360+360)%360;RA=(RA+Math.floor(L/90)*90-Math.floor(RA/90)*90)/15;
    const sd=.39782*Math.sin(L*r),cd=Math.cos(Math.asin(sd)),cH=(Math.cos(90.833*r)-sd*Math.sin(lat*r))/(cd*Math.cos(lat*r));
    if(cH>1||cH<-1){out.push(null);continue}
    const H=(up?360-Math.acos(cH)/r:Math.acos(cH)/r)/15,UT=((H+RA-.06571*t-6.622-lh)%24+24)%24;
    out.push(new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())+UT*36e5).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}).replace(':','h'))}
  return out}

/* horaires impératifs : l'étape doit commencer à l'heure fixée (table réservée, entrée horodatée, bateau) */
/* justificatifs (bons PDF, billets, confirmations) joints à une étape : conservés dans l'appareil et dans la sauvegarde */
const jusHTML=l=>`<div class="f jus wide"><label>Justificatifs joints (bon d'échange, billet, confirmation)</label>${(l.docs||[]).map(d=>`<div class="doc"><span class="grow" style="min-width:0;word-break:break-word">📎 ${esc(d.name)}</span><button type="button" class="btn sec sm" data-jopen="${esc(d.id)}">Ouvrir</button><button type="button" class="btn sec sm" data-jdel="${esc(d.id)}" aria-label="Retirer ${esc(d.name)}">✕</button></div>`).join('')}<div class="row" style="margin-top:8px"><button type="button" class="btn sec sm grow" data-jadd>＋ Joindre un PDF ou une photo</button></div></div>`;
async function openJus(id){const f=await DB.get('files',id);if(!f||!f.blob)return toast('Justificatif introuvable sur cet appareil (sauvegarde ancienne ?)',5000);
  if(!OPENABLE.test(f.blob.type))return deliver(new Blob([f.blob],{type:'application/octet-stream'}),f.name||'justificatif');
  const a=document.createElement('a');a.href=urlOf(f);a.target='_blank';a.rel='noopener noreferrer';document.body.append(a);a.click();a.remove()}
const ctiImp=c=>{let t=t2m(c.debut);const out=[];c.lignes.forEach((l,i)=>{const s=t,w=impWait(t,l);t+=w+num(l.duree);if(l.imp&&l.hfix){const f=t2m(l.hfix);let d=s-f;if(d<-720)d+=1440;if(d>720)d-=1440;out.push({l,i,start:s,fix:f,late:d,wait:w})}});return out};
const impTxt=x=>`${lab(x.l)} à ${hm(x.fix)} : `+(x.late>0?`arrivée prévue ${hm(x.start)}, ${x.late} min trop tard`:x.late===0?'pile à l\'heure':`arrivée prévue ${hm(x.start)}, attente de ${-x.late} min`);
/* vérification avant le départ : réservations, confirmations, bons, échéances */
function ctiCheck(c){const out=[],A=(lvl,t)=>out.push({lvl,txt:t}),now=Date.now(),k=ctiCalc(c);
  if(!c.lignes.length)A('bloc','Le déroulé est vide : aucune étape à conduire');
  if(!c.debut)A('att','Heure de début non renseignée');
  c.lignes.forEach(l=>{if(l.type!=='pec'&&l.type!=='fin'&&blank(l.duree))A('att',lab(l)+' : durée non renseignée, les horaires suivants sont faussés')});
  if(k.marge!==null&&k.marge<0)A('bloc','Dépassement de l\'heure de fin imposée de '+mins(-k.marge));
  if(k.wait>=20)A('att','Attente cumulée de '+mins(k.wait)+' avant des horaires impératifs : à utiliser (temps libre) ou à déplacer');
  const tv=c.lignes.filter(l=>l.todo&&blank(l.obs)).length;if(tv)A('att',tv+' point'+(tv>1?'s':'')+' à vérifier sur place, sans constat du repérage');
  c.lignes.forEach(l=>{const n=lab(l);if(!(l.imp||l.bon||l.conf||l.lim||l.type==='repas'))return;
    if(l.type==='repas'||l.imp){if(!l.conf)A('att',n+' : confirmation non renseignée');if(!l.bon)A('att',n+' : bon d\'échange ou n° de réservation manquant');if(!ctiEff(c,c.lignes.indexOf(l)))A('att',n+' : effectif attendu non précisé')}
    if(l.conf==='À confirmer')A('att',n+' : à confirmer');if(l.conf==='Annulé')A('bloc',n+' : prestation annulée, à remplacer');
    if(l.imp&&!l.hfix)A('att',n+' : horaire impératif sans heure fixée');
    if(l.lim){const j=Math.ceil((new Date(l.lim+'T23:59:59')-now)/864e5);if(j<0)A('bloc',n+' : date limite dépassée ('+frDate(l.lim)+')');else if(j<=3)A('att',n+' : date limite '+(j<=0?'aujourd\'hui':'dans '+j+' jour'+(j>1?'s':''))+' ('+frDate(l.lim)+')')}});
  ctiImp(c).filter(x=>x.late>0).forEach(x=>A('bloc','Horaire impératif non tenu : '+impTxt(x)));
  if(!c.contacts.length&&!String(c.h.contacts||'').trim())A('att','Aucun contact saisi (chauffeur, restaurants, sites)');
  return out}
const chkHTML=o=>(o.length?o.map(x=>`<div class="al ${x.lvl}"><b>${x.lvl==='bloc'?'✖':'⚠'}</b> ${esc(x.txt)}</div>`).join(''):'<p><b>✔ Aucune anomalie sur les points contrôlés.</b></p>')+'<p class="mute" style="font-size:13px">Ce contrôle porte sur les informations saisies : déroulé (durées, heure de début, dépassement de l\'heure de fin), horaires impératifs, confirmations, bons, dates limites, effectifs, contacts. Il ne vérifie rien auprès des prestataires.</p>';
const archRun=c=>{const r=c.run;if(!r||!r.done)return;c.hist=Array.isArray(c.hist)?c.hist:[];if(c.hist.some(h=>h.t0===r.t0))return;
  c.hist.push({t0:r.t0,end:r.end,rows:c.lignes.map(l=>{const g=obj(r.log[l.id]),o=obj(r.ov[l.id]);return {lab:lab(l),prevu:num(l.duree),reel:g.t0&&g.t1?Math.max(0,Math.round((g.t1-g.t0)/6e4)):null,skip:!!o.skip,note:g.note||'',cnt:(g.cnt||[]).map(x=>({t:x.t,n:x.n})),eff:l.eff||''}})})};
VIEWS.ctiList={top:1,t:()=>'Tiango '+sub2('Cadres techniques d\'itinéraire'),r:()=>renderItems('cti')};
VIEWS.cti={item:1,back:'ctiList',t:()=>esc(item.titre||'Nouveau CTI')+sub2('Cadre technique d\'itinéraire'),async r(){
  const c=item,reps=(await live('reps')).map(fixRep),allI=(await live('items')).map(fixItem),vis=allI.filter(i=>i.kind==='vis'),pres=allI.filter(i=>i.kind==='pre').sort((a,b)=>String(a.nom).localeCompare(String(b.nom),'fr')),
    cir=c.circId?allI.find(i=>i.kind==='cir'&&i.id===c.circId):null,sibs=c.ed?allI.filter(i=>i.kind==='cti'&&i.id!==c.id&&i.circId===c.circId&&i.ed===c.ed&&i.contacts.length):[];
  if(item!==c||view!=='cti')return;
  if(!OPEN.has('c_init')){OPEN.add('c_init');OPEN.add(c.titre?'c_der':'c_id')}
  $('#main').innerHTML=`<div class="card"><div class="row"><button class="btn acc grow" id="cRun"${c.lignes.length?'':' disabled'}>▶ ${obj(c.run).t0?(c.run.done?'Bilan de la conduite':'Reprendre la conduite'):'Conduire la prestation'}</button></div>
    <div class="row" style="margin-top:10px"><button class="btn grow" id="cPv">📄 Aperçu et export</button><button class="btn sec grow" id="cChk">✔ Vérifier avant le départ</button><button class="btn sec grow" id="cRep">🧭 ${c.repId?'Ouvrir le repérage':'Préparer le repérage'}</button></div>
    ${c.repId?'<div class="row" style="margin-top:10px"><button class="btn sec grow" id="cGet">↩ Reporter les relevés du repérage dans le CTI</button></div>':''}
    <div class="box" id="cBil"></div><div id="cFl"></div>${cir?`<div class="row" style="margin-top:10px"><button class="btn sec grow" id="cCir">🧭 Ouvrir le circuit : ${esc(cir.titre||'sans titre')}${c.jour?' (jour '+num(c.jour)+')':''}</button></div>`:''}</div>
   ${sec('c_id','🧾','Prestation',`<div class="grid" id="cId">${CTI_ID.map(f=>field(f,c,'ci_')).join('')}</div>`)}
   ${sec('c_h','📋','En-tête du CTI',`<div class="grid" id="cH">${CTI_H.map(f=>field(f,c.h,'ch_')).join('')}</div><div class="row" style="margin-top:12px"><button class="btn sec sm" id="cSun">☀️ Calculer le lever et le coucher du soleil</button></div>`)}
   ${sec('c_ct','📞','Contacts : chauffeurs, guides, restaurants, sites','<div id="cCt"></div>',String(c.contacts.length))}
   ${sec('c_ac','🧑‍🤝‍🧑','Accompagnateurs : guides, chauffeur','<div id="cAc"></div>',String(c.accs.length))}
   ${sec('c_der','⏱️','Déroulé horaire','<div id="cL"></div>',String(c.lignes.length))}
   ${sec('c_pj','📎','Pièces à joindre au dossier','<div id="cPj"></div>',String(c.pieces.length))}
   ${sec('c_hi','🗂️','Historique des réalisations','<div id="cHi"></div>',String((c.hist||[]).length))}
   ${sec('c_ap','✅','À compléter après le repérage','<div id="cAp"></div>',String(c.apres.length))}${delBtn}`;
  bindSecs();
  const bilan=()=>{const k=ctiCalc(c);$('#cBil').textContent=c.lignes.length?ctiBilan(k):'Ajoutez des trajets et des arrêts : Tiango calcule les horaires, les kilomètres cumulés et le bilan des temps.';
    $('#cBil').classList.toggle('warn',k.marge!==null&&k.marge<0);
    const im=ctiImp(c).filter(x=>x.late>0),fl=ctiFlags(c,reps);$('#cFl').innerHTML=(im.length?`<div class="box warn"><b>Horaires impératifs non tenus</b>${im.map(x=>`<div class="al bloc">${esc(impTxt(x))}</div>`).join('')}</div>`:'')+(fl.length?`<div class="box warn"><b>Contraintes des sites de ce CTI</b>${fl.map(a=>`<div class="al ${a.lvl}"><b>${esc(a.ico+' '+a.short)}</b> — ${esc(a.lieu)}<div class="mute">${esc(a.txt)}</div></div>`).join('')}</div>`:'');$$('#cL .pt').forEach((el,i)=>{const h=$('.hr',el);if(h&&k.rows[i])h.textContent=k.rows[i].hor+(k.rows[i].att?' · après '+k.rows[i].att+' min d\'attente':'')});setCnt('c_der',String(c.lignes.length))};
  bindFields($('#cId'),c,e=>{saveItem();bilan();if(e&&e.dataset.k==='titre')$('#ttl').firstChild.textContent=e.value||'Nouveau CTI'});
  bindFields($('#cH'),c.h,()=>saveItem());
  const opt=(L,v,lab)=>`<option value="">—</option>`+L.map(x=>`<option value="${esc(x.id)}"${x.id===v?' selected':''}>${esc(lab(x))}</option>`).join('');
  const detBtns=l=>{const v=vis.find(x=>x.id===l.visId);
    if(l.grp)return `<div class="row" style="margin-top:8px"><button type="button" class="btn sec sm" data-reg="${esc(l.grp)}">↩ Regrouper les étapes de ce site en une seule ligne</button></div>`;
    return ctiCanDetail(l,v)?`<div class="row" style="margin-top:8px"><button type="button" class="btn sec sm" data-det="${esc(l.id)}">🔎 Détailler les étapes (${ctiSubs(l,v).length}) : stations, pause, repas</button></div>`:''};
  editList($('#cL'),c.lignes,[['type','Nature de la ligne','select',Object.entries(LT).map(([k,v])=>[k,v[0]])],['lieu','Étape / lieu','text'],['duree','Durée (minutes)','number'],['km','Kilomètres de l\'étape','dec'],['imp','Horaire','select',[['Impératif','Impératif : ne pas décaler (réservation, billet, bateau, retour imposé)']]],['hfix','Heure impérative (début de l\'étape)','time'],
     ['a_dep','Plan : dépose','text'],['a_park','Plan : stationnement','text'],['a_ent','Plan : entrée','text'],['a_rdv','Plan : rendez-vous','text'],
     ['conf','Confirmation','select',['À confirmer','Confirmé','Annulé']],['bon','Bon d\'échange / n° de réservation','text'],['lim','Date limite de confirmation ou d\'annulation','date'],['eff','Effectif à cette étape (vide = identique à l\'étape précédente)','number'],['conv','Consignes convenues avec le prestataire','textarea'],
     ['itin','Itinéraire à suivre (voies, repères, stationnement)','textarea'],['nature','Nature du temps','text'],['contenu','Contenu / thème du commentaire','textarea'],
     ['rem','Remarques : sécurité, stationnement, WC, PMR, impératifs','textarea'],['todo','À vérifier sur place, au repérage','textarea'],['obs','Constat du repérage','textarea']],
    {add:'＋ Ajouter une ligne',blank:()=>{const last=c.lignes[c.lignes.length-1],ty=!c.lignes.length?'pec':last.type==='trajet'?'arret':'trajet';return {id:uid(),type:ty,nature:LT[ty][1],lieu:'',duree:ty==='pec'?'':'10'}},
     title:l=>(LT[l.type]||LT.arret)[0]+(l.lieu?' — '+l.lieu:''),after:bilan,
     intro:'Alternez trajets et arrêts. Ce qui ne peut être confirmé que sur place se note dans « À vérifier sur place » : ces cases ressortent en jaune dans le document et alimentent le repérage.',
     extra:l=>`<div class="row" style="margin-top:10px"><span class="hr"></span>${!blank(l.prevu)&&num(l.prevu)!==num(l.duree)?`<span class="hr t">prévu ${num(l.prevu)} min · relevé ${num(l.duree)} min${l.releve?' le '+frDate(l.releve):''}</span>`:''}${l.todo?'<span class="hr t" style="background:#fff2a8;color:#5c4a00">à vérifier sur place</span>':''}${l.type==='arret'||l.type==='repas'?`<span class="grow"></span>`:''}</div>
       ${(i=>blank(l.eff)&&ctiEff(c,i)?`<div class="mute" style="margin-top:6px">Effectif retenu pour cette étape : <b>${esc(ctiEff(c,i))}</b> (repris plus haut)</div>`:'')(c.lignes.indexOf(l))}
       ${jusHTML(l)}${detBtns(l)}${l.type==='trajet'||l.type==='pec'||l.type==='fin'?'':`<div class="grid"><div class="f"><label>Fiche de repérage liée</label><select data-lk="repId">${opt(reps,l.repId,r=>r.d.site||'Site sans nom')}</select></div>
       <div class="f"><label>Site à visiter lié</label><select data-lk="visId">${opt(vis,l.visId,v=>v.nom||'Site sans nom')}</select></div>
       ${(v=>v&&v.formules.length?`<div class="f"><label>Formule de visite</label><select data-lk="fId"><option value="">Discours complet</option>${v.formules.map(f=>`<option value="${esc(f.id)}"${f.id===l.fId?' selected':''}>${esc((f.nom||'Formule')+' · '+mins(fTot(v,f).d))}</option>`).join('')}</select></div>`:'')(vis.find(x=>x.id===l.visId))}</div>${l.repId?'<div class="row" style="margin-top:8px"><button class="btn sec sm" data-fill>Reprendre les remarques pratiques de la fiche</button></div>':''}`}`});
  /* les sélecteurs de type et de liens sont gérés par délégation, car la liste se redessine */
  $('#cL').addEventListener('change',e=>{const el=e.target.closest('.pt');if(!el)return;const l=c.lignes[+el.dataset.i];
    if(e.target.dataset.k==='type'){const old=Object.values(LT).map(x=>x[1]);if(!l.nature||old.includes(l.nature)){l.nature=(LT[l.type]||LT.arret)[1];const n=$('[data-k="nature"]',el);if(n)n.value=l.nature}saveItem(true)}
    if(e.target.dataset.lk){l[e.target.dataset.lk]=e.target.value;if(e.target.dataset.lk==='visId')l.fId='';if(e.target.dataset.lk==='fId'&&l.fId){const v=vis.find(x=>x.id===l.visId),f=v&&v.formules.find(x=>x.id===l.fId);if(f&&blank(l.prevu)){l.duree=String(fTot(v,f).d)}}saveItem(true);VIEWS.cti.r()}});
  $('#cL').addEventListener('click',e=>{const bt=e.target.closest('[data-det],[data-reg]');if(!bt)return;
    if(bt.dataset.det){const i=c.lignes.findIndex(x=>x.id===bt.dataset.det),l=c.lignes[i];if(l&&ctiDetail(c,i,vis.find(x=>x.id===l.visId))){saveItem(true);VIEWS.cti.r();toast('Étapes détaillées : indiquez l\'heure impérative du repas sur sa ligne')}}
    else if(ctiRegroup(c,bt.dataset.reg)){saveItem(true);VIEWS.cti.r();toast('Étapes regroupées')}});
  $('#cL').addEventListener('click',e=>{if(!e.target.matches('[data-fill]'))return;const el=e.target.closest('.pt'),l=c.lignes[+el.dataset.i],r=reps.find(x=>x.id===l.repId);if(!r)return;
    const P=pratiques(r.d);
    if(!P.length)return toast('La fiche liée ne contient pas encore d\'informations pratiques');
    const have=new Set(String(l.rem||'').split('\n').map(x=>x.trim())),add=P.map(x=>x[0]+' : '+x[1]).filter(x=>!have.has(x.trim()));   /* pas de doublon si on clique deux fois */
    if(!add.length)return toast('Ces remarques sont déjà reprises');
    l.rem=[l.rem,...add].filter(Boolean).join('\n');saveItem(true);VIEWS.cti.r();toast('Remarques complétées depuis la fiche')});
  checkList($('#cPj'),c.pieces,{ph:'Carte, plan, horaires de marée, fiches…',after:()=>setCnt('c_pj',String(c.pieces.length))});
  checkList($('#cAp'),c.apres,{ph:'Chronos réels, noms des voies, parkings…',after:()=>setCnt('c_ap',String(c.apres.length))});
  drawContacts(c,pres,reps,sibs);
  editList($('#cAc'),c.accs,[['role','Fonction','select',['Guide principal','Second guide','Chauffeur','Autre accompagnateur']],['presId','Fiche de l\'annuaire (facultatif)','select',pres.filter(p=>['Chauffeur','Autocariste','Guide local','Guide-conférencier'].includes(p.role)).map(p=>[p.id,(p.nom||'Sans nom')+' · '+p.role])],['nom','Nom (saisie libre possible)','text'],['tel','Téléphone','tel']],
    {add:'＋ Ajouter un accompagnateur',blank:()=>({id:uid(),role:c.accs.length?'Second guide':'Guide principal',presId:'',nom:'',tel:''}),title:a=>(a.role||'Accompagnateur')+(accNom(a,pres)?' — '+accNom(a,pres):''),after:()=>setCnt('c_ac',String(c.accs.length)),
     intro:'Le groupe est accompagné par le guide, éventuellement un second guide, et le chauffeur du car, qui compte aussi comme accompagnateur. Le nom peut être saisi librement.'});
  bilan();
  if($('#cCir'))$('#cCir').onclick=()=>go('cir',c.circId);
  $('#cRun').onclick=()=>go('ctiRun');
  $('#iDel').onclick=()=>delItem('ce CTI');$('#iDup').onclick=dupItem;
  $('#cPv').onclick=()=>preview({title:c.titre||'CTI',name:'CTI_'+slug(c.titre)+(c.date?'_'+c.date:''),blocks:ctiModel(c,{pres,reps}),landscape:true,back:'cti'});
  $('#cSun').onclick=async()=>{let g=null;if(c.repId){const r=await DB.get('reps',c.repId);g=r&&(r.gps||(r.points.find(p=>p.gps)||{}).gps)}
    for(const l of c.lignes){if(g)break;if(l.gps)g=l.gps;else if(l.repId){const r=reps.find(x=>x.id===l.repId);g=r&&r.gps}}
    let src='position d\'un site repéré';if(!g){try{g=await getGPS();src='votre position actuelle'}catch(x){return toast(x.message,4500)}}
    if(item!==c)return;const [a,b]=sunTimes(g.lat,g.lon,c.date||today());c.h.soleil=`Lever ${a||'—'} · coucher ${b||'—'} (calcul Tiango, heure de cet appareil)`;saveItem(true);const f=$('[data-k="soleil"]');if(f)f.value=c.h.soleil;toast('Calculé d\'après '+src)};
  {const inp=document.createElement('input');inp.type='file';inp.accept='application/pdf,image/*,.pdf';inp.multiple=true;inp.hidden=true;inp.id='fJus';$('#main').append(inp);let tgt=null;
    $('#cL').addEventListener('click',e=>{const a=e.target.closest('[data-jadd],[data-jopen],[data-jdel]');if(!a)return;const el=a.closest('.pt'),l=c.lignes[+el.dataset.i];if(!l)return;
      if(a.dataset.jadd!==undefined){tgt={l,el};inp.value='';inp.click()}
      else if(a.dataset.jopen)openJus(a.dataset.jopen);
      else confirmBox('Retirer ce justificatif ?',((l.docs||[]).find(d=>d.id===a.dataset.jdel)||{}).name||'','Retirer',async()=>{l.docs=(l.docs||[]).filter(d=>d.id!==a.dataset.jdel);await DB.del('files',a.dataset.jdel).catch(()=>{});saveItem(true);$('.jus',el).outerHTML=jusHTML(l)})});
    inp.onchange=async()=>{if(!tgt)return;const {l,el}=tgt;l.docs=l.docs||[];let n=0;
      for(const file of [...inp.files]){if(file.size>40*1048576){toast('« '+file.name+' » dépasse 40 Mo : non joint',4500);continue}
        const ty=safeType(file.type,'doc'),f={id:uid(),repId:c.id,kind:'doc',name:String(file.name||'justificatif'),type:ty,blob:file.slice(0,file.size,ty),t:Date.now()+n};
        try{await DB.put('files',f);l.docs.push({id:f.id,name:f.name,type:ty});n++}catch(x){toast('Justificatif non enregistré : espace insuffisant ?',4500)}}
      if(n){saveItem(true);$('.jus',el).outerHTML=jusHTML(l);toast(n+' justificatif'+(n>1?'s':'')+' joint'+(n>1?'s':''))}}}
  $('#cChk').onclick=()=>{$('#modal').innerHTML=sheetHTML('Vérification avant le départ',chkHTML(ctiCheck(c)));$('#mNo').onclick=closeModal};
  { const H=(c.hist||[]).slice().reverse(),box=$('#cHi');box.innerHTML=H.length?H.map((h,i)=>`<div class="doc"><span class="hr">${new Date(h.t0).toLocaleDateString('fr-FR')}</span><span class="grow">${hm(tsMin(h.t0))} → ${hm(tsMin(h.end))}</span><button class="btn sec sm" data-h="${i}">Voir</button></div>`).join(''):'<p class="mute">Chaque conduite terminée est conservée ici. Préparer la suivante ne l\'efface pas.</p>';
    $$('[data-h]',box).forEach(b=>b.onclick=()=>{const h=H[+b.dataset.h];$('#modal').innerHTML=sheetHTML('Réalisation du '+new Date(h.t0).toLocaleDateString('fr-FR'),`<table class="tb"><tr><th>Étape</th><th>Prévu</th><th>Réel</th><th>Compté</th></tr>${h.rows.map(x=>`<tr><td>${esc(x.lab)}${x.note?`<br><span class="mute">${esc(x.note)}</span>`:''}</td><td>${x.prevu} min</td><td>${x.skip?'annulé':x.reel===null?'—':x.reel+' min'}</td><td>${x.cnt.length?x.cnt[x.cnt.length-1].n+(x.eff?' / '+x.eff:''):'—'}</td></tr>`).join('')}</table>`);$('#mNo').onclick=closeModal})}
  $('#cRep').onclick=async()=>{let r=c.repId&&await DB.get('reps',c.repId);if(r&&r.deleted)r=null;
    if(r)fixRep(r);
    if(!r){r={id:uid(),created:Date.now(),updated:Date.now(),ctiId:c.id,d:{site:'Repérage — '+(c.titre||'itinéraire'),type:'Itinéraire / excursion',date:today(),pays:'France'},gps:null,points:[]};c.repId=r.id}
    let n=0;for(const l of c.lignes)if(!r.points.some(p=>p.lineId===l.id)){r.points.push({id:uid(),lineId:l.id,nom:(LT[l.type]||LT.arret)[0]+(l.lieu?' — '+l.lieu:''),note:l.todo?'À vérifier : '+l.todo+'\nConstat : ':'',duree:'',gps:null});n++}
    await DB.put('reps',r);saveItem(true);if(n)toast(n+' étape(s) ajoutée(s) au repérage');OPEN.add('pts');openLieu(r.id,['cti',c.id])};
  /* report des relevés : on montre d'abord le prévu et le relevé côte à côte, puis l'utilisateur décide */
  if($('#cGet'))$('#cGet').onclick=async()=>{const r=await DB.get('reps',c.repId);if(!r||r.deleted)return toast('Le repérage lié a été supprimé');fixRep(r);const ch=[];
    for(const p of r.points){const l=c.lignes.find(x=>x.id===p.lineId);if(!l)continue;
      const d=!blank(p.duree)&&num(p.duree)!==num(l.duree)?num(p.duree):null,note=String(p.note||'').replace(/^À vérifier : [\s\S]*?\nConstat : ?/,'').trim(),o=note&&note!==l.obs?note:null;
      if(d!==null||o!==null||(p.gps&&!l.gps))ch.push({l,d,o,gps:p.gps})}
    const vis=ch.filter(x=>x.d!==null||x.o!==null);
    if(!vis.length){ch.forEach(x=>{if(x.gps)x.l.gps=x.gps});if(ch.length)saveItem(true);return toast('Aucun relevé nouveau dans le repérage')}
    $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Relevés du repérage"><div class="sheet"><h2>Relevés du repérage</h2><p class="mute">Cochez ce que vous retenez. La durée prévue reste affichée sur la ligne, à côté de la durée relevée.</p>
      ${vis.map((x,i)=>`<div class="chk" style="align-items:flex-start"><input type="checkbox" id="rl${i}" checked><label for="rl${i}" class="grow"><b>${esc((LT[x.l.type]||LT.arret)[0]+(x.l.lieu?' — '+x.l.lieu:''))}</b>${x.d!==null?`<br>Durée : prévu ${num(x.l.duree)} min → relevé <b>${x.d} min</b>`:''}${x.o!==null?`<br><span class="mute">Constat : ${esc(x.o)}</span>`:''}</label></div>`).join('')}
      <div class="row" style="margin-top:14px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn grow" id="mOk">Reporter dans le CTI</button></div></div></div>`;
    $('#mNo').onclick=closeModal;
    $('#mOk').onclick=async()=>{let n=0;vis.forEach((x,i)=>{if(!$('#rl'+i).checked)return;n++;
        if(x.d!==null){if(blank(x.l.prevu))x.l.prevu=String(num(x.l.duree));x.l.duree=String(x.d);x.l.releve=today()}
        if(x.o!==null)x.l.obs=x.o;if(x.gps)x.l.gps=x.gps});
      closeModal();if(!n)return;await saveItem(true);await VIEWS.cti.r();toast(n+' ligne(s) mise(s) à jour')}};
}};
const accNom=(a,pres)=>{const p=a.presId&&pres.find(x=>x.id===a.presId);return a.nom||(p&&p.nom)||''};
const accTel=(a,pres)=>{const p=a.presId&&pres.find(x=>x.id===a.presId);return a.tel||(p&&[p.tel,p.tel2].filter(Boolean).join(' / '))||''};
function ctiModel(c,x={}){
  const k=ctiCalc(c),B=[{h1:'Cadre technique d\'itinéraire'},{meta:[c.titre,c.sous,c.date&&new Date(c.date+'T12:00').toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}),c.lignes.length&&hm(t2m(c.debut))+' → '+hm(k.end)].filter(Boolean).join(' — ')}];
  if(c.note)B.push({small:c.note});
  const H=CTI_H.map(f=>[f[1],String(c.h[f[0]]??'').trim()]).filter(x=>x[1]);if(H.length)B.push({table:H});
  if(c.accs.length)B.push({h2:'Accompagnateurs ('+c.accs.length+')'},{grid:{w:[2600,5400,3600],head:['Fonction','Nom','Téléphone'],rows:c.accs.map(a=>[a.role||'',accNom(a,x.pres||[])||'à préciser',accTel(a,x.pres||[])])}});
  const CT=c.contacts.map(ct=>{const I=contactInfo(ct,x.pres||[],x.reps||[]);return [ct.role||'',I.nom+(I.det?'\n'+I.det:''),I.tel,ct.note||'']});
  if(CT.length)B.push({h2:'Contacts'},{grid:{w:[1800,4200,2600,4400],head:['Rôle','Nom','Téléphone','Remarque'],rows:CT}});
  const FL=ctiFlags(c,x.reps||[]);if(FL.length)B.push({h2:'Contraintes des sites à traiter'},{grid:{w:[1600,3000,3000,6400],head:['Niveau','Lieu','Contrainte','Détail'],rows:FL.map(a=>[{t:lvlName[a.lvl],b:a.lvl==='bloc',fill:a.lvl==='bloc'?'F8D7D0':'FFF2A8'},a.lieu,a.short,a.txt])}});
  if(c.lignes.length){B.push({h2:'Déroulé horaire'},{grid:{w:[1100,700,1900,2300,850,1300,3700,3288],
    head:['Horaire','Durée','Étape / lieu','Itinéraire à suivre','Km (étape / cumul)','Nature du temps','Contenu / thème du commentaire','Remarques : sécurité, stationnement, WC, PMR, impératifs'],
    rows:c.lignes.map((l,i)=>[{t:k.rows[i].hor+(k.rows[i].att?'\n(attente '+k.rows[i].att+' min)':''),b:1},num(l.duree)?num(l.duree)+' min':'—',{t:(l.type==='arret'?'ARRÊT — ':l.type==='trajet'?'Trajet : ':'')+(l.lieu||(LT[l.type]||LT.arret)[0]),b:l.type==='arret'},l.itin||'',k.rows[i].km,l.nature||(LT[l.type]||LT.arret)[1],l.contenu||'',
      {t:[l.rem,l.obs&&'Constat du repérage : '+l.obs,l.todo&&'À VÉRIFIER SUR PLACE : '+l.todo].filter(Boolean).join('\n'),fill:l.todo?'FFF2A8':undefined}])}},{p:'Bilan temps : '+ctiBilan(k)+'.'})}
  const DJ=c.lignes.map((l,i)=>({l,i})).filter(({l})=>(l.docs&&l.docs.length)||l.imp||l.bon||l.conf||l.lim||l.eff||l.conv||l.a_dep||l.a_park||l.a_ent||l.a_rdv);
  if(DJ.length)B.push({h2:'Dossier du jour et plan d\'accès'},{grid:{w:[1100,2300,1500,2100,1800,2200,3400],head:['Horaire','Étape','Horaire impératif','Confirmation / bon','Effectif / date limite','Plan : dépose · stationnement · entrée · rendez-vous','Consignes convenues'],
    rows:DJ.map(({l,i})=>[{t:k.rows[i].hor,b:1},lab(l),l.imp?{t:'IMPÉRATIF'+(l.hfix?' '+hm(t2m(l.hfix)):''),b:1,fill:'F8D7D0'}:'souple',[l.conf,l.bon,...(l.docs||[]).map(d=>'Justificatif : '+d.name)].filter(Boolean).join('\n'),[ctiEff(c,i)&&'Attendu : '+ctiEff(c,i),l.lim&&'Limite : '+frDate(l.lim)].filter(Boolean).join('\n'),[l.a_dep&&'Dépose : '+l.a_dep,l.a_park&&'Stationnement : '+l.a_park,l.a_ent&&'Entrée : '+l.a_ent,l.a_rdv&&'Rendez-vous : '+l.a_rdv].filter(Boolean).join('\n'),l.conv||''])}});
  if(checksTxt(c.pieces))B.push({h2:'Pièces à joindre au dossier d\'accompagnement'},{p:checksTxt(c.pieces)});
  if(checksTxt(c.apres))B.push({h2:'À compléter après le repérage'},{p:checksTxt(c.apres)});
  B.push({small:'Document établi avec Tiango – tiango.fr'});return B;
}
/* ================= DISCOURS DE VISITE d'un site à visiter : station par station, multilingue ================= */
let vLang='fr', play=null, playT=null, visBack=null;
/* un point du site est couvert par un module qui porte son nom (tous types : station, pause, extension) ou qui lui a été relié */
const nmz=t=>strip(t).replace(/[^a-z0-9]+/g,' ').trim();
function sameName(a,b){a=nmz(a);b=nmz(b);if(!a||!b)return false;if(a===b)return true;const [c,l]=a.length<b.length?[a,b]:[b,a];return l.includes(c)&&c.split(' ').length>=3&&c.length/l.length>=.6}
const modCovers=(m,p)=>(m.ptId&&m.ptId===p.id)||sameName(m.lieu,p.nom)||sameName(m.titre&&m.titre.fr,p.nom);
const visMiss=(v,rep)=>rep?(rep.points||[]).filter(p=>nmz(p.nom)&&!(v.modules||[]).some(m=>modCovers(m,p))):[];
const nextMCode=v=>'M'+(Math.max(-1,...v.modules.map(m=>{const x=/^M(\d+)$/i.exec(String(m.code||'').trim());return x?+x[1]:-1}))+1);
const MT=[['station','Station'],['pause','Pause'],['repas','Repas (déjeuner, dîner)'],['extension','Extension / variante']];
const ml=(o,l)=>(o&&(o[l]||o.fr||Object.values(o)[0]))||'';
const modByCode=(v,code)=>v.modules.find(m=>(m.code||'').trim().toLowerCase()===code.trim().toLowerCase());
const dupCodes=v=>{const c={};v.modules.forEach(m=>{const k=(m.code||'').trim().toLowerCase();if(k)c[k]=(c[k]||0)+1});return Object.keys(c).filter(k=>c[k]>1)};
const fCodes=f=>String(f.codes||'').split(/[,;→>·\n]+/).map(s=>s.trim()).filter(Boolean);
const fSeq=(v,f)=>fCodes(f).map(c=>modByCode(v,c)).filter(Boolean);
const fTot=(v,f)=>{const s=fSeq(v,f);return {n:s.length,d:s.reduce((a,m)=>a+num(m.duree),0),p:s.reduce((a,m)=>a+num(m.parole),0)}};

VIEWS.visList={top:1,t:()=>'Tiango '+sub2('Discours de visite'),r:()=>{visBack=null;return renderItems('vis')}};
VIEWS.vis={item:1,get back(){return visBack&&item&&visBack[1]===item.lieuId?visBack:'visList'},t:()=>esc(item.nom||'Nouveau discours')+sub2('Discours de visite'),async r(){
  const v=item,lx=(await live('reps')).map(fixRep).filter(r=>!r.ctiId);if(item!==v||view!=='vis')return;if(!v.langs||!v.langs.length)v.langs=['fr'];if(!v.langs.includes(vLang))vLang=v.langs[0];
  if(!OPEN.has('v_init')){OPEN.add('v_init');OPEN.add(v.modules.length?'v_mod':'v_id')}
  const L=()=>vLang;
  $('#main').innerHTML=`<div class="card"><div class="row"><button class="btn acc grow" id="vPlay"${v.modules.length?'':' disabled'}>▶ Mode visite</button><button class="btn grow" id="vPv">📄 Dossier (Word, PDF)</button></div>
    <div class="row" style="margin-top:10px"><button class="btn sec grow" id="vAi">✨ Faire rédiger par une IA</button><button class="btn sec grow" id="vImp">📥 Importer</button></div>
    <div class="row" style="margin-top:10px"><button class="btn sec grow" id="vExp">⬆ Exporter au format Tiango</button></div>
    <div class="f"><label>Langue affichée pour les textes</label><div class="seg" id="vLg">${v.langs.map(l=>`<button type="button" data-l="${esc(l)}" class="${l===vLang?'on':''}">${esc(lname(l))}</button>`).join('')}</div></div></div>
   <div id="vMissTop"></div>
   ${sec('v_id','🏛️','Identité du discours',`<div class="grid" id="vId">${[['lieuId','Site à visiter (fiche de repérage) — obligatoire','select',lx.map(r=>[r.id,lieuNom(r)+(r.d.ville?' — '+r.d.ville:'')])],['nom','Titre du discours (ex. Visite de la cathédrale)','text','wide'],['type','Type de site','text'],['public','Public visé','text'],['langsTxt','Langues (codes séparés par des virgules : fr, en, es, de…)','text'],['angle','Fil rouge retenu','textarea'],['resume','Présentation en quelques lignes','textarea']].map(f=>field(f,{...v,langsTxt:v.langs.join(', ')},'vi_')).join('')}</div><div id="vLb"></div>`)}
   ${sec('v_mod','📍','Modules du parcours','<div id="vMod"></div>',String(v.modules.length))}
   ${sec('v_for','🧩','Formules d\'assemblage','<div id="vFor"></div>',String(v.formules.length))}
   ${sec('v_sec','⚠️','Consignes de sécurité à dire au groupe',`<div class="grid">${mlField(['secu','Consignes, mot pour mot','ml'],v,vLang,true)}</div>`)}
   ${sec('v_faq','❓','Questions fréquentes','<div id="vFaq"></div>',String(v.faq.length))}
   ${sec('v_ane','💬','Anecdotes','<div id="vAne"></div>',String(v.anec.length))}
   ${sec('v_pb','☔','Plan B','<div id="vPb"></div>',String(v.planb.length))}
   ${sec('v_np','🚫','Phrases à ne pas dire','<div id="vNp"></div>',String(v.nepas.length))}
   ${sec('v_gl','🔤','Glossaire','<div id="vGl"></div>',String(v.gloss.length))}
   ${sec('v_fi','🧾','Fiche pratique','<div id="vFi"></div>',String(v.fiche.length))}
   ${sec('v_src','📚','Sources','<div id="vSrc"></div>',String(v.sources.length))}
   ${sec('v_cf','☎️','Points à confirmer','<div id="vCf"></div>',String(v.conf.length))}${delBtn}`;
  bindSecs();
  $$('#vLg button').forEach(b=>b.onclick=()=>{saveItem(true);vLang=b.dataset.l;VIEWS.vis.r()});
  $$('#vId [data-k]').forEach(e=>e.oninput=()=>{const k=e.dataset.k;
    if(k==='langsTxt')v.langs=e.value.split(/[,; ]+/).map(s=>s.trim().toLowerCase()).filter(Boolean);else v[k]=e.value;
    if(k==='lieuId'){const r=lx.find(x=>x.id===e.value);v.lieu=r?String(r.d.ville||''):'';if(r&&!v.nom)v.nom=lieuNom(r);drawLb()}
    saveItem();if(k==='nom')$('#ttl').firstChild.textContent=e.value||'Nouveau discours'});
  const drawMiss=()=>{const t=$('#vMissTop');if(!t)return;const rp=lx.find(r=>r.id===v.lieuId),miss=visMiss(v,rp);
    t.innerHTML=miss.length?`<div class="box warn" role="alert" style="margin-top:12px"><b class="l">${miss.length} point${miss.length>1?'s':''} du site sans discours</b><div style="margin:4px 0 8px">${miss.map(p=>esc(p.nom)).join(' · ')}</div><div class="row"><button type="button" class="btn sec sm grow" id="vMiss">＋ Ajouter un module pour ${miss.length>1?'chacun':'ce point'}</button><button type="button" class="btn sec sm grow" id="vMissAi">✨ Les faire rédiger par une IA</button></div></div>`:'';
    if(miss.length){$('#vMiss').onclick=async()=>{miss.forEach(p=>v.modules.push({code:nextMCode(v),type:'station',lieu:String(p.nom).trim(),duree:p.duree?String(p.duree):'',ptId:p.id,titre:{},texte:{}}));await saveItem(true);VIEWS.vis.r()};
      $('#vMissAi').onclick=async()=>{await saveItem(true);aiSheet('vis',{siteId:v.lieuId})}}};
  drawMiss();
  const drawLb=()=>{const b=$('#vLb');if(!b)return;const ok=v.lieuId&&lx.some(r=>r.id===v.lieuId);b.innerHTML=(ok?'':'<div class="box warn" style="margin-top:10px">Ce discours n\'est rattaché à aucun site à visiter. Choisissez le site ci-dessus (créez-le d\'abord dans l\'onglet Sites s\'il n\'existe pas).</div>')+(ok?'<div class="row" style="margin-top:10px"><button type="button" class="btn sec sm grow" id="vLo">📍 Fiche de repérage du site</button></div>':'');
    const o=$('#vLo');if(o)o.onclick=async()=>{await saveItem(true);openLieu(v.lieuId,['vis',v.id])};
    const nv=v.modules.filter(m=>m.type!=='pause'&&m.type!=='repas'&&m.statut!=='Validé').length,nc=(v.conf||[]).filter(c=>!c.done&&String(c.t||'').trim()).length;
    drawMiss();
    b.insertAdjacentHTML('beforeend',`<div class="box ${nv||nc?'warn':''}" style="margin-top:10px"><b class="l">Avant le départ</b>${nv?nv+' module'+(nv>1?'s':'')+' non validé'+(nv>1?'s':'')+' (statut à « Validé » après relecture et recoupement).':'Tous les modules sont validés.'}${nc?'<br>'+nc+' point'+(nc>1?'s':'')+' à confirmer (section « Points à confirmer »).':''}</div>`)};drawLb();
  $('#vId [data-k="langsTxt"]').onchange=()=>{saveItem(true);VIEWS.vis.r()};
  $('[data-ml="secu"]').oninput=e=>{(v.secu=v.secu||{})[vLang]=e.target.value;saveItem()};
  const cnt=(k,a)=>()=>setCnt(k,String(a.length));
  editList($('#vMod'),v.modules,[['code','Code (M0, M1, P1, EXT-A…)','text'],['type','Nature','select',MT],['lieu','Lieu précis','text','wide'],['duree','Durée sur place (minutes)','number'],['parole','Temps de parole (minutes)','number'],
     ['voir','Ce que l\'on voit','textarea'],['cle','Message clé','textarea'],['place','Où placer le groupe','textarea'],['consigne','Consigne de conduite (jamais prononcée)','textarea'],['titre','Titre de la station','mlt'],['texte','Discours','ml','tall'],['statut','Statut de validation','select',['Brouillon','À recouper','Validé']],['valide','Validé par, le (nom, date)','text'],['src','Source du propos (auteur, titre, page, date de consultation)','textarea']],
    {lang:L,add:'＋ Ajouter un module',blank:()=>({code:nextMCode(v),type:'station',titre:{},texte:{}}),title:m=>[m.code,m.lieu].filter(Boolean).join(' — '),after:()=>{cnt('v_mod',v.modules)();drawMiss()},
     intro:'Chaque module est une étape autonome : un site, une durée, un message clé et le discours dans chaque langue.',
     extra:m=>{const miss=v.langs.filter(l=>!(m.texte||{})[l]),dup=dupCodes(v).includes((m.code||'').trim().toLowerCase());return (dup?`<div class="box warn" style="margin-top:8px">Le code <b>${esc(m.code)}</b> est utilisé par plusieurs modules : les formules ne retrouveraient que le premier. Donnez à chaque module un code différent.</div>`:'')+(m.type==='pause'||!miss.length?'':`<p class="mute" style="margin:8px 0 0">Discours manquant : ${miss.map(lname).join(', ')}</p>`)}});
  const pickBox=f=>{
    if(!v.modules.some(m=>(m.code||'').trim()))return '<p class="mute" style="margin:10px 0 0">Aucun module pour l\'instant : créez-les d\'abord dans la section « Modules ».</p>';
    const seq=fCodes(f).map(c=>c.toLowerCase());
    return `<div class="f wide" style="margin-top:10px"><label>Modules disponibles : cochez-les dans l'ordre de la visite</label><div class="pks">${v.modules.filter(m=>(m.code||'').trim()).map(m=>{
      const r=seq.indexOf(m.code.trim().toLowerCase()),on=r>=0,d=[m.lieu,m.type==='pause'?'pause':m.type==='repas'?'repas':'',num(m.duree)?mins(num(m.duree)):''].filter(Boolean).join(' · ');
      return `<button type="button" class="pk${on?' on':''}" data-pk="${esc(m.code.trim())}" role="checkbox" aria-checked="${on}"><span class="rk">${on?r+1:''}</span><span class="pkt"><b>${esc(m.code)}</b>${d?' — '+esc(d):''}</span></button>`}).join('')}</div><p class="mute" style="margin:6px 0 0;font-size:13px">Le numéro indique la place dans la formule. Décochez pour retirer : les suivants se renumérotent.</p></div>`};
  const forExtra=f=>{const t=fTot(v,f),bad=fCodes(f).filter(c=>!modByCode(v,c));return pickBox(f)+`<div class="row" style="margin-top:10px"><span class="hr">${mins(t.d)}</span><span class="hr t">${t.n} modules</span><span class="hr t">parole ${mins(t.p)}</span></div>${bad.length?`<div class="box warn">Code${bad.length>1?'s':''} introuvable${bad.length>1?'s':''} parmi les modules : <b>${esc(bad.join(', '))}</b>. ${bad.length>1?'Ils ne sont pas comptés':'Il n\'est pas compté'} dans la durée.</div>`:''}`};
  editList($('#vFor'),v.formules,[['nom','Nom de la formule','text'],['codes','Ordre des modules (rempli par les cases ci-dessous, modifiable à la main)','text','wide'],['pour','Pour qui, dans quel cas','textarea']],
    {add:'＋ Ajouter une formule',title:f=>f.nom||'Formule',after:cnt('v_for',v.formules),intro:'Une formule assemble des modules selon la durée disponible. Tiango en calcule la durée totale.',extra:forExtra});
  $('#vFor').addEventListener('click',e=>{const b=e.target.closest('[data-pk]');if(!b)return;
    const el=b.closest('.pt'),f=v.formules[+el.dataset.i],code=b.dataset.pk,key=code.toLowerCase(),cs=fCodes(f);
    f.codes=(cs.some(c=>c.toLowerCase()===key)?cs.filter(c=>c.toLowerCase()!==key):cs.concat(code)).join(', ');
    $('input[data-k="codes"]',el).value=f.codes;$('.xtra',el).innerHTML=forExtra(f);saveItem();
    const nb=$(`[data-pk="${CSS.escape(code)}"]`,el);nb&&nb.focus({preventScroll:true})});
  const stOpts=v.modules.filter(m=>m.code).map(m=>[m.code,m.code+(m.lieu?' — '+m.lieu:'')]);
  editList($('#vFaq'),v.faq,[['stat','Station concernée (vide = visite entière)','select',stOpts],['q','Question','mlt'],['r','Réponse courte','ml']],{lang:L,add:'＋ Ajouter une question',title:x=>ml(x.q,vLang),after:cnt('v_faq',v.faq)});
  editList($('#vAne'),v.anec,[['stat','Station concernée (vide = visite entière)','select',stOpts],['titre','Titre','text'],['statut','Statut','select',['Fait documenté','Tradition locale','Légende','À vérifier']],['texte','Récit','ml']],{lang:L,add:'＋ Ajouter une anecdote',title:x=>x.titre||'Anecdote',after:cnt('v_ane',v.anec)});
  editList($('#vPb'),v.planb,[['sit','Situation','text'],['duree','Durée','text'],['sol','Solution','textarea']],{add:'＋ Ajouter une situation',title:x=>x.sit||'Situation',after:cnt('v_pb',v.planb)});
  editList($('#vNp'),v.nepas,[['non','Ne pas dire','textarea'],['oui','Dire','textarea']],{add:'＋ Ajouter une phrase',title:x=>x.non||'',after:cnt('v_np',v.nepas)});
  editList($('#vGl'),v.gloss,[['t','Terme','mlt'],['note','Définition, prononciation','textarea']],{lang:L,add:'＋ Ajouter un terme',title:x=>v.langs.map(l=>(x.t||{})[l]).filter(Boolean).join(' · '),after:cnt('v_gl',v.gloss)});
  editList($('#vFi'),v.fiche,[['r','Rubrique','text'],['c','Contenu','textarea']],{add:'＋ Ajouter une rubrique',title:x=>x.r||'Rubrique',after:cnt('v_fi',v.fiche),intro:'Horaires, tarifs, accès, règlement… tels que relevés dans les sources. À vérifier au repérage.'});
  editList($('#vSrc'),v.sources,[['titre','Source','text','wide'],['url','Adresse internet','url'],['fiab','Fiabilité','select',['Officielle','Institutionnelle','Secondaire','À recouper']]],{add:'＋ Ajouter une source',title:x=>x.titre||'Source',after:cnt('v_src',v.sources)});
  checkList($('#vCf'),v.conf,{ph:'Question à poser au site, donnée à vérifier…',after:cnt('v_cf',v.conf)});
  $('#iDel').onclick=()=>delItem('ce discours');$('#iDup').onclick=dupItem;
  $('#vPv').onclick=()=>preview({title:v.nom||'Visite',name:'Dossier-visite_'+slug(v.nom),blocks:visModel(v),back:'vis'});
  $('#vAi').onclick=async()=>{await saveItem(true);aiSheet('vis',{siteId:v.lieuId})};$('#vImp').onclick=async()=>{await saveItem(true);importSheet()};
  $('#vExp').onclick=()=>deliver(new Blob([JSON.stringify(visOut(v),null,1)],{type:'application/json'}),'visite_'+slug(v.nom)+'.tiango.json');
  $('#vPlay').onclick=()=>choosePlay(v,(seq,nom)=>{play={seq,i:0,nom,fs:19,idx:seq.map(m=>v.modules.indexOf(m))};go('visPlay')});
}};

/* choix de la formule, puis lancement (depuis le dossier de visite ou depuis la conduite d'un CTI) */
function choosePlay(v,start){
  const dc=dupCodes(v);if(dc.length)return toast('Codes de module en double : '+dc.join(', ').toUpperCase()+'. Donnez à chaque module un code différent avant de lancer la visite.',7000);
  const F=v.formules.map(f=>({f,t:fTot(v,f)})).filter(x=>x.t.n),run=(seq,nom)=>{closeModal();start(seq,nom)};
  if(!v.modules.length)return toast('Cette visite n\'a pas encore de module');
  if(!F.length)return run(v.modules,'Tous les modules');
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Quelle formule ?"><div class="sheet"><h2>Quelle formule ?</h2><div style="display:grid;gap:10px;margin-top:12px">
    ${F.map((x,i)=>`<button class="btn sec" data-f="${i}">${esc(x.f.nom||'Formule')} · ${mins(x.t.d)}</button>`).join('')}<button class="btn sec" data-f="all">Tous les modules, dans l'ordre</button><button class="btn" id="mNo">Annuler</button></div></div></div>`;
  $('#mNo').onclick=closeModal;$$('[data-f]').forEach(b=>b.onclick=()=>b.dataset.f==='all'?run(v.modules,'Tous les modules'):run(fSeq(v,F[+b.dataset.f].f),F[+b.dataset.f].f.nom));
}
/* ---------- Mode visite : une station à la fois, sur le terrain ---------- */
VIEWS.visPlay={item:1,get back(){return (play&&play.back)||'vis'},t:()=>esc(item.nom||'Visite')+sub2(esc(play.nom||'Mode visite')),r(){
  const v=item,m=play.seq[play.i],n=play.seq.length;clearInterval(playT);
  try{if(navigator.wakeLock&&!play.wl)navigator.wakeLock.request('screen').then(w=>play.wl=w).catch(()=>{})}catch(e){}  /* garde l'écran allumé pendant la visite */
  if(play.at!==play.i){play.at=play.i;play.t0=Date.now()}const t0=play.t0;   /* le chrono de la station survit au changement de langue */
  leave=()=>{clearInterval(playT);try{play&&play.wl&&play.wl.release()}catch(e){}if(play)play.wl=null};   /* l'écran est rendu au système, quelle que soit la sortie */
  const bx=(l,t,c='')=>t?`<div class="box ${c}"><b class="l">${l}</b><span style="white-space:pre-wrap">${esc(t)}</span></div>`:'';
  if(!play.back)DB.put('kv',{vid:v.id,idx:play.idx||[],i:play.i,lang:vLang,fs:play.fs,nom:play.nom,t:Date.now()},'run-vis').catch(()=>{});   /* reprise après interruption */
  const secu=ml(v.secu,vLang);
  $('#main').innerHTML=`<div class="play" style="--fs:${play.fs}px;padding-bottom:70px">
    <div class="row" style="margin-top:12px"><div class="seg grow">${v.langs.map(l=>`<button type="button" data-l="${esc(l)}" class="${l===vLang?'on':''}">${esc(l.toUpperCase())}</button>`).join('')}</div><button class="mini" id="pA" aria-label="Taille du texte">A±</button><button class="mini" id="pR" aria-label="Consignes, glossaire, sources">ℹ︎ Réf.</button></div>
    <div class="row" style="margin-top:12px"><span class="hr">${play.i+1} / ${n}</span>${m.code?`<span class="hr t">${esc(m.code)}</span>`:''}${num(m.duree)?`<span class="hr t">${num(m.duree)} min sur place</span>`:''}${num(m.parole)?`<span class="hr t">parole ${num(m.parole)} min</span>`:''}${m.type!=='pause'&&m.type!=='repas'&&m.statut&&m.statut!=='Validé'?`<span class="hr t">⚠ ${esc(m.statut)}</span>`:''}<span class="grow"></span><span class="hr t" id="pT">0:00</span></div>
    <h2>${esc(ml(m.titre,vLang)||m.lieu||m.code||'Module')}</h2>${m.lieu&&ml(m.titre,vLang)?`<div class="mute">${esc(m.lieu)}</div>`:''}
    ${play.i===0&&secu?bx('Consignes générales à rappeler au groupe',secu,'warn'):''}${bx('Où placer le groupe',m.place)}${bx('Consigne de conduite',m.consigne,'warn cons')}${bx('Message clé',m.cle)}
    ${(m.texte||{})[vLang]?String(m.texte[vLang]).split(/\n{2,}/).map(p=>/^\s*⟨/.test(p)?`<div class="box warn cons">${esc(p.trim().replace(/^⟨|⟩$/g,''))}</div>`:`<div class="say">${esc(p)}</div>`).join(''):`<div class="empty">${m.type==='pause'?'<b>Pause</b>Annoncez l\'heure de reprise.':`<b>Pas de discours en ${esc(lname(vLang))}</b>pour ce module.`}</div>`}
    ${bx('Ce que l\'on voit',m.voir)}</div>
   <nav class="pnav"><div class="wrap"><button class="btn sec" id="pP"${play.i?'':' disabled'}>‹</button><button class="btn sec" id="pX">Anecdotes</button><button class="btn sec" id="pQ">Questions</button><button class="btn acc" id="pN">${play.i<n-1?'Suivant ›':(play.back?'Retour au CTI':'Terminer')}</button></div></nav>`;
  playT=setInterval(()=>{const e=$('#pT');if(!e||view!=='visPlay')return clearInterval(playT);const s=Math.floor((Date.now()-t0)/1000);e.textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0')},1000);
  $$('.play [data-l]').forEach(b=>b.onclick=()=>{vLang=b.dataset.l;VIEWS.visPlay.r()});
  $('#pA').onclick=()=>{play.fs=play.fs>=27?17:play.fs+4;$('.play').style.setProperty('--fs',play.fs+'px')};
  $('#pP').onclick=()=>{play.i--;window.scrollTo(0,0);VIEWS.visPlay.r()};
  $('#pN').onclick=()=>{if(play.i<n-1){play.i++;window.scrollTo(0,0);VIEWS.visPlay.r()}else{DB.del('kv','run-vis').catch(()=>{});$('#bBack').click()}};
  const sheet=(t,L,more)=>{$('#modal').innerHTML=`<div class="modal"><div class="sheet"><h2>${t}</h2>${L.length?L.map(([a,b,c])=>`<details class="sec"><summary>${esc(a)}${c?`<span class="cnt">${esc(c)}</span>`:''}</summary><div class="body"><p style="white-space:pre-wrap;font-size:17px;line-height:1.5">${esc(b)}</p></div></details>`).join(''):'<p class="mute">Rien d\'enregistré pour cette visite.</p>'}<div class="row" style="margin-top:12px">${more&&more.length?`<button class="btn sec grow" id="mMore">Voir aussi les autres (${more.length})</button>`:''}<button class="btn grow" id="mNo">Fermer</button></div></div></div>`;$('#mNo').onclick=closeModal;if(more&&more.length)$('#mMore').onclick=()=>sheet(t,L.concat(more))};
  const mine=x=>String(x.stat||'').toLowerCase()===String(m.code||'').toLowerCase()&&m.code,split=A=>{const any=A.some(x=>x.stat);if(!any)return[A,[]];return[A.filter(mine),A.filter(x=>!mine(x))]};
  $('#pX').onclick=()=>{const [a,o]=split(v.anec),f=x=>[(x.stat&&!mine(x)?x.stat+' · ':'')+(x.titre||'Anecdote'),ml(x.texte,vLang),[x.statut,(x.texte||{})[vLang]?'':'texte non traduit'].filter(Boolean).join(' · ')];sheet('Anecdotes'+(v.anec.some(x=>x.stat)?' · '+(m.code||'station'):''),a.map(f),o.map(f))};
  $('#pQ').onclick=()=>{const [a,o]=split(v.faq),own=a.filter(f=>(f.q||{})[vLang]);const fb=a.length&&!own.length?[['⚠ Aucune question en '+lname(vLang),'Les questions ci-dessous sont affichées dans leur langue d\'origine, sans traduction.']]:[];sheet('Questions fréquentes'+(v.faq.some(x=>x.stat)?' · '+(m.code||'station'):''),fb.concat((own.length?own:a).map(f=>[ml(f.q,vLang),ml(f.r,vLang)])),o.map(f=>[(f.stat?f.stat+' · ':'')+ml(f.q,vLang),ml(f.r,vLang)]))};
  $('#pR').onclick=()=>sheet('Références de la visite',[[ 'Consignes générales',secu,secu&&!(v.secu||{})[vLang]?'langue d\'origine':''],['Où placer le groupe',m.place],['Fiche pratique',v.fiche.filter(x=>x.r||x.c).map(x=>(x.r||'')+' : '+(x.c||'')).join('\n')],['Glossaire',v.gloss.map(g=>(ml(g.t,vLang)||'')+(g.note?' — '+g.note:'')).filter(Boolean).join('\n')],['Phrases à ne pas dire',v.nepas.map(x=>'✗ '+(x.non||'')+(x.oui?'\n✓ '+x.oui:'')).join('\n')],['Plan B',v.planb.map(x=>(x.sit||'')+' : '+(x.sol||'')).join('\n')],['Sources du module',[m.src,m.statut&&'Statut : '+m.statut,m.valide&&'Validé par : '+m.valide].filter(Boolean).join('\n')],['Sources du dossier',v.sources.map((s,i)=>`[${i+1}] ${s.titre||''}${s.url?' — '+s.url:''}${s.fiab?' ('+s.fiab+')':''}`).join('\n')],['Points à confirmer',(v.conf||[]).filter(c=>!c.done&&String(c.t||'').trim()).map(c=>'• '+c.t).join('\n')]].filter(x=>x[1]));
}};

/* ---------- Dossier de visite : modèle pour l'aperçu, le PDF et le Word ---------- */
function visModel(v){
  const B=[{h1:v.nom||'Visite'},{meta:['Dossier de visite',v.lieu,v.type,v.langs.map(lname).join(', ')].filter(Boolean).join(' · ')}];
  const id=[['Public visé',v.public],['Fil rouge',v.angle],['Présentation',v.resume]].filter(x=>x[1]);if(id.length)B.push({table:id});
  if(v.fiche.length)B.push({h2:'Fiche pratique'},{table:v.fiche.filter(x=>x.r||x.c).map(x=>[x.r||'',x.c||''])});
  if(v.modules.length)B.push({h2:'Modules du parcours'},{grid:{w:[600,2000,550,2300,2300,1900],head:['N°','Lieu précis','min','Ce que l\'on voit','Message clé','Où placer le groupe'],rows:v.modules.map(m=>[{t:m.code||'',b:1},m.lieu||'',num(m.duree)?String(num(m.duree)):'—',m.voir||'',m.cle||'',m.place||''])}});
  if(v.formules.length)B.push({h2:'Formules d\'assemblage'},{grid:{w:[1500,3300,1000,1000,2800],head:['Formule','Modules','Parole','Total','Pour qui'],rows:v.formules.map(f=>{const t=fTot(v,f);return [{t:f.nom||'',b:1},fSeq(v,f).map(m=>m.code).join(' → '),mins(t.p),mins(t.d),f.pour||'']})}});
  for(const l of v.langs){const M=v.modules.filter(m=>(m.texte||{})[l]);if(!M.length&&!(v.secu||{})[l])continue;
    B.push({h2:'Discours — '+lname(l)});if((v.secu||{})[l])B.push({h3:'Consignes de sécurité'},{p:v.secu[l]});
    for(const m of M){B.push({h3:[m.code,ml(m.titre,l)||m.lieu,num(m.parole)?num(m.parole)+' min':''].filter(Boolean).join(' — ')});if(m.statut||m.src||m.valide)B.push({small:['Statut : '+(m.statut||'non renseigné'),m.valide&&'Validé par : '+m.valide,m.src&&'Source : '+m.src].filter(Boolean).join(' · ')});if(m.consigne)B.push({small:'⟨'+m.consigne+'⟩'});B.push({p:m.texte[l]})}
    const Q=v.faq.filter(f=>(f.q||{})[l]);if(Q.length){B.push({h3:'Questions fréquentes'});Q.forEach(f=>B.push({p:'« '+f.q[l]+' »\n'+((f.r||{})[l]||'')}))}}
  if(v.anec.length){B.push({h2:'Anecdotes'});v.anec.forEach(a=>B.push({h3:(a.titre||'Anecdote')+(a.statut?' · ['+a.statut.toUpperCase()+']':'')},{p:v.langs.map(l=>(a.texte||{})[l]).filter(Boolean).join('\n\n')}))}
  if(v.planb.length)B.push({h2:'Plan B'},{grid:{w:[2800,5000,1800],head:['Situation','Solution','Durée'],rows:v.planb.map(x=>[x.sit||'',x.sol||'',x.duree||''])}});
  if(v.nepas.length)B.push({h2:'Phrases à ne pas dire'},{grid:{w:[1,1],head:['Ne pas dire','Dire'],rows:v.nepas.map(x=>[x.non||'',x.oui||''])}});
  if(v.gloss.length)B.push({h2:'Glossaire'},{grid:{w:[...v.langs.map(()=>2),3],head:[...v.langs.map(lname),'Définition, prononciation'],rows:v.gloss.map(g=>[...v.langs.map(l=>(g.t||{})[l]||''),g.note||''])}});
  if(v.sources.length)B.push({h2:'Sources'},{p:v.sources.map((s,i)=>`[${i+1}] ${s.titre||''}${s.url?' — '+s.url:''}${s.fiab?' ('+s.fiab+')':''}`).join('\n')});
  if(checksTxt(v.conf))B.push({h2:'Points à confirmer'},{p:checksTxt(v.conf)});
  B.push({small:'Dossier établi avec Tiango – tiango.fr'});return B;
}

/* ---------- Un site à visiter est toujours rattaché à un lieu ; son discours est toujours rattaché à un site ---------- */
async function askSite(cb){
  await fillLieux();
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Nouveau site à visiter"><div class="sheet"><h2>Nouveau site à visiter</h2>
   <div class="f"><label for="aSn">Nom du site à visiter</label><input id="aSn" placeholder="Ex. Cathédrale Saint-Samson" autocomplete="off"></div>
   <div class="f"><label for="aSl">Lieu : ville, région ou pays</label><input id="aSl" list="dlLieux" autocomplete="off" placeholder="Ex. Dol-de-Bretagne"></div>
   <p class="mute" style="margin:6px 0 0">Les lieux déjà saisis sont proposés. Les PMR, horaires, étapes… se renseignent ensuite sur la fiche du site.</p>
   <div class="row" style="margin-top:12px"><button class="btn grow" id="aSok">Créer le site</button><button class="btn sec" id="aSno">Annuler</button></div></div></div>`;
  $('#aSno').onclick=closeModal;$('#aSn').focus();
  $('#aSok').onclick=()=>{const n=$('#aSn').value.trim(),l=$('#aSl').value.trim();
    if(!n)return toast('Donnez un nom au site à visiter');if(!l)return toast('Indiquez le lieu : ville, région ou pays');
    closeModal();cb(n,l)}}
async function discoursNew(siteId){
  if(!(await gate('vis')))return;
  const r=(await live('reps')).map(fixRep).find(x=>x.id===siteId);if(!r)return toast('Site introuvable');
  const it=NEW.vis();it.lieuId=r.id;it.nom=lieuNom(r);it.lieu=String(r.d.ville||'');it.type=String(r.d.type||'');
  await DB.put('items',it);visBack=['edit',r.id];go('vis',it.id)}
/* création d'un discours : par l'IA (recommandé, un module par point du site) ou à la main */
function discoursChoice(siteId,intro){
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Créer le discours"><div class="sheet"><h2>Créer le discours de visite</h2>
   <p class="mute">${intro?esc(intro)+' ':''}Avec l'IA, le discours arrive déjà rédigé : un module par point repéré sur le site, dans chaque langue. Il reste à le relire et à le valider.</p>
   <div style="display:grid;gap:10px;margin-top:10px"><button class="btn acc" id="dcAi">✨ Faire rédiger par une IA</button><button class="btn sec" id="dcImp">📥 J'ai déjà la réponse de l'IA : importer</button><button class="btn sec" id="dcMan">✍️ Écrire à la main</button><button class="btn sec" id="dcNo">Annuler</button></div></div></div>`;
  $('#dcNo').onclick=closeModal;$('#dcAi').onclick=()=>aiSheet('vis',{siteId});$('#dcImp').onclick=()=>importSheet();
  $('#dcMan').onclick=()=>{closeModal();discoursNew(siteId)}}
/* depuis la liste des discours : choisir le site (ses points alimentent la consigne) ou saisir un autre site */
async function visAiStart(){
  const L=(await live('reps')).map(fixRep).filter(r=>!r.ctiId).sort((a,b)=>lieuNom(a).localeCompare(lieuNom(b),'fr'));
  if(!L.length)return aiSheet('vis');
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Pour quel site ?"><div class="sheet"><h2>Discours pour quel site ?</h2>
   <div class="f"><label for="pkS">Site à visiter déjà enregistré</label><select id="pkS"><option value="">Choisir…</option>${L.map(r=>`<option value="${esc(r.id)}">${esc(lieuNom(r)+(r.d.ville?' — '+r.d.ville:''))}</option>`).join('')}</select></div>
   <div class="row" style="margin-top:12px"><button class="btn grow" id="pkOk">Continuer</button><button class="btn sec grow" id="pkOther">Un autre site</button></div><div class="row" style="margin-top:8px"><button class="btn sec grow" id="pkNo">Annuler</button></div></div></div>`;
  $('#pkNo').onclick=closeModal;$('#pkOther').onclick=()=>aiSheet('vis');$('#pkOk').onclick=()=>{const id=$('#pkS').value;if(!id)return toast('Choisissez un site');aiSheet('vis',{siteId:id})}}
async function pickSite(cb){
  const L=(await live('reps')).map(fixRep).filter(r=>!r.ctiId).sort((a,b)=>String(a.d.ville||'~').localeCompare(String(b.d.ville||'~'),'fr')||lieuNom(a).localeCompare(lieuNom(b),'fr'));
  if(!L.length)return toast('Créez d\'abord un site à visiter (onglet Sites)',4500);
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Pour quel site ?"><div class="sheet"><h2>Discours pour quel site ?</h2>
   <div class="f"><label for="pkS">Site à visiter</label><select id="pkS"><option value="">Choisir…</option>${L.map(r=>`<option value="${esc(r.id)}">${esc(lieuNom(r)+(r.d.ville?' — '+r.d.ville:''))}</option>`).join('')}</select></div>
   <div class="row" style="margin-top:12px"><button class="btn grow" id="pkOk">Continuer</button><button class="btn sec" id="pkNo">Annuler</button></div></div></div>`;
  $('#pkNo').onclick=closeModal;$('#pkOk').onclick=()=>{const id=$('#pkS').value;if(!id)return toast('Choisissez un site');closeModal();cb(id)}}

/* ---------- Reprise d'une visite interrompue (rechargement, veille, fermeture du navigateur) ---------- */
async function fillResume(){
  const b=$('#rsmBox');if(!b)return;const s=await DB.get('kv','run-vis').catch(()=>null);if(!s)return;
  const it=(await live('items')).find(x=>x.id===s.vid&&x.kind==='vis');if(!it){DB.del('kv','run-vis').catch(()=>{});return}
  const v=fixItem(it),seq=(s.idx||[]).map(i=>v.modules[i]).filter(Boolean);if(!seq.length){DB.del('kv','run-vis').catch(()=>{});return}
  b.innerHTML=`<div class="box warn" style="margin-top:14px"><b class="l">▶ Visite en cours</b>« ${esc(v.nom||'Visite')} » · ${esc(s.nom||'')} : station ${Math.min(s.i+1,seq.length)} sur ${seq.length}, langue ${esc(String(s.lang||'fr').toUpperCase())}.
    <div class="row" style="margin-top:8px"><button class="btn acc grow" id="rsGo">Reprendre la visite</button><button class="btn sec" id="rsNo">Terminer</button></div></div>`;
  $('#rsNo').onclick=()=>{DB.del('kv','run-vis').catch(()=>{});b.innerHTML=''};
  $('#rsGo').onclick=()=>{vLang=s.lang||vLang;play={seq,i:Math.min(s.i||0,seq.length-1),nom:s.nom,fs:s.fs||19,idx:s.idx};go('visPlay',v.id)}}
/* ================= ESPACE BUDGETS : coûts, marge, prix de vente ================= */
const BCAT=['Transport','Entrées et visites','Restauration','Hébergement','Guidage et honoraires','Frais de préparation et repérage','Divers','Imprévus'];
const BMODE=[['pp','Par participant payant'],['pa','Par personne, accompagnateurs compris'],['fixe','Forfait pour le groupe']];
const ARR=[['0','Au centime'],['0.5','Aux 50 centimes supérieurs'],['1','À l\'euro supérieur'],['5','Aux 5 € supérieurs']];
const qty=l=>blank(l.qte)?1:num(l.qte);   /* quantité vide = 1 ; un zéro saisi reste zéro */
const lineCost=(l,n,acc)=>num(l.pu)*qty(l)*(l.mode==='fixe'?1:l.mode==='pa'?n+acc:n);
function budCalc(b,nOverride){
  const n=nOverride??Math.max(0,Math.round(num(b.pax))),acc=Math.max(0,Math.round(num(b.acc)));
  const cost=k=>b.lignes.reduce((a,l)=>a+lineCost(l,k,acc),0);
  const total=cost(n),fixe=cost(0),varPP=n?(total-fixe)/n:cost(1)-fixe,rev=n?total/n:0,step=num(b.arr);
  const round=p=>step?Math.ceil(p/step-1e-9)*step:Math.round(p*100)/100;
  const okT=t=>t>0&&(b.base==='cout'||t<100);   /* une marge de 100 % du prix de vente est impossible */
  const priceFor=t=>{t=t/100;return round(b.base==='cout'?rev*(1+t):rev/(1-t))};
  const at=(p,k=n)=>{const ca=p*k,c=cost(k),m=ca-c;return {p,ca,cost:c,m,sPv:ca?m/ca*100:0,sCout:c?m/c*100:0}};
  /* seuil de rentabilité : le coût est linéaire en effectif, donc calcul exact, sans plafond */
  let seuil=null,nulle=false;const prix=num(b.prix),v1=cost(1)-fixe;if(prix>v1+1e-9)seuil=Math.max(1,Math.ceil(fixe/(prix-v1)-1e-9));else if(fixe<=1e-9&&prix>0&&prix>=v1-1e-9){seuil=1;nulle=true}   /* prix = coût variable, sans coût fixe : équilibre dès le premier payant, marge nulle */
  const vides=b.lignes.filter(l=>blank(l.pu)).length;
  const cats=BCAT.map(c=>[c,b.lignes.filter(l=>(l.cat||'Divers')===c).reduce((a,l)=>a+lineCost(l,n,acc),0)]).filter(x=>x[1]);
  return {n,acc,total,fixe,varPP,rev,cats,priceFor,at,prix,seuil,nulle,cost,vides,refus:[b.t1,b.t2,b.t3].map(num).filter(t=>t>0&&!okT(t)),props:[b.t1,b.t2,b.t3].map(num).filter(okT).map(t=>({t,...at(priceFor(t))}))};
}
const pct=x=>(Math.round(x*10)/10).toLocaleString('fr-FR')+' %';

VIEWS.budList={top:1,t:()=>'Tiango '+sub2('Budgets et prix de vente'),r:()=>renderItems('bud')};
VIEWS.bud={item:1,back:'budList',t:()=>esc(item.titre||'Nouveau budget')+sub2('Budget de prestation'),async r(){
  const b=item,ctis=(await live('items')).filter(i=>i.kind==='cti').map(fixItem);
  if(item!==b||view!=='bud')return;
  if(!OPEN.has('b_init')){['b_init','b_id','b_co','b_ma'].forEach(k=>OPEN.add(k))}
  $('#main').innerHTML=`<div class="card"><div class="row"><button class="btn grow" id="bPv">📄 Aperçu et export</button></div><div class="kpis" id="bK"></div></div>
   ${sec('b_id','🧾','Cadre du budget',`<div class="grid" id="bId">${[['titre','Intitulé de la prestation','text','wide'],['pax','Participants payants','number'],['acc','Accompagnateurs non payants (guide, chauffeur…)','number'],['ctiId','CTI lié','select',ctis.map(c=>[c.id,c.titre||'CTI sans titre'])]].map(f=>field(f,b,'bi_')).join('')}</div>
     ${ctis.length?'<div class="row" style="margin-top:12px"><button class="btn sec sm" id="bFrom">Proposer des postes à partir du CTI lié</button></div>':''}`)}
   ${sec('b_co','🧮','Coûts','<div id="bL"></div><div id="bC"></div>',String(b.lignes.length))}
   ${sec('b_ma','🎯','Marge et prix de vente',`<div class="grid" id="bM">${[['base','Le taux de marge se calcule','select',[['pv','Sur le prix de vente (taux de marge commerciale)'],['cout','Sur le coût (coefficient multiplicateur)']]],['arr','Arrondi du prix par personne','select',ARR],
       ['t1','Proposition prudente : taux (%)','dec'],['t2','Proposition médiane : taux (%)','dec'],['t3','Proposition haute : taux (%)','dec']].map(f=>field(f,b,'bm_')).join('')}</div><div id="bP"></div>
     <div class="grid" id="bMine">${field(['prix','Mon prix de vente par personne (€)','dec'],b,'bm_')}</div><div id="bO"></div>
     <p class="mute" style="margin-top:12px">Montants sans traitement de la TVA : Tiango ne calcule ni la TVA sur la marge des opérateurs de voyages, ni la franchise en base. Vérifiez votre régime avant d'annoncer un prix.</p>`)}${delBtn}`;
  bindSecs();
  const out=()=>{const k=budCalc(b);setCnt('b_co',String(b.lignes.length));
    $$('#bL .pt').forEach((el,i)=>{const h=$('.hr',el),l=b.lignes[i];if(h&&l)h.textContent=eur(lineCost(l,k.n,k.acc))});
    $('#bK').innerHTML=`<div class="kpi"><b>${eur(k.total)}</b><span>coût total pour ${k.n} payants</span></div><div class="kpi"><b>${eur(k.rev)}</b><span>coût de revient par payant</span></div>${k.prix?`<div class="kpi hi"><b>${eur(k.prix)}</b><span>mon prix par personne</span></div><div class="kpi"><b>${eur(k.at(k.prix).m)}</b><span>marge sur la prestation</span></div>`:''}`;
    $('#bC').innerHTML=b.lignes.length?`${k.vides?`<div class="box warn"><b>${k.vides} poste${k.vides>1?'s':''} sans montant.</b> Le total est incomplet : il compte ${k.vides>1?'ces postes':'ce poste'} pour zéro.</div>`:''}<table class="tb"><tr><th>Par catégorie</th><th>Montant</th><th>Part</th></tr>${k.cats.map(([c,m])=>`<tr><td>${esc(c)}</td><td>${eur(m)}</td><td>${k.total?pct(m/k.total*100):'—'}</td></tr>`).join('')}
      <tr class="sel"><td>Total</td><td>${eur(k.total)}</td><td></td></tr></table><div class="box">Coûts fixes du groupe : <b>${eur(k.fixe)}</b> · coûts variables : <b>${eur(k.varPP)}</b> par participant. Plus le groupe est petit, plus les coûts fixes pèsent sur chacun.</div>`:'';
    $('#bP').innerHTML=!k.n||!k.total?'<div class="box">Saisissez le nombre de participants et au moins un poste de coût pour obtenir des propositions de prix.</div>':
      `<table class="tb"><tr><th>Proposition</th><th>Prix / pers.</th><th>Recette</th><th>Marge</th></tr>${k.props.map((p,i)=>`<tr><td>${['Prudente','Médiane','Haute'][i]||''} · ${pct(p.t)}</td><td><b>${eur(p.p)}</b></td><td>${eur(p.ca)}</td><td>${eur(p.m)}</td></tr>`).join('')}</table>
       <div class="row" style="margin-top:10px">${k.props.map((p,i)=>`<button class="btn sec sm grow" data-take="${p.p}">Retenir ${eur(p.p)}</button>`).join('')}</div>${k.refus.length?`<div class="box warn">Taux de ${k.refus.map(pct).join(', ')} écarté : une marge ne peut pas atteindre 100 % du prix de vente. Calculez-la sur le coût, ou baissez le taux.</div>`:''}${k.vides?'<div class="box warn">Ces prix reposent sur un budget incomplet.</div>':''}`;
    if(!k.prix||!k.n){$('#bO').innerHTML='';return}
    const a=k.at(k.prix),S=[...new Set([k.n-10,k.n-5,k.n,k.n+5,k.n+10].filter(x=>x>0))];
    $('#bO').innerHTML=`<div class="kpis"><div class="kpi${a.m<0?'':' hi'}"><b>${eur(a.m)}</b><span>marge pour ${k.n} payants</span></div><div class="kpi"><b>${pct(a.sPv)}</b><span>du prix de vente</span></div><div class="kpi"><b>${pct(a.sCout)}</b><span>du coût</span></div>
      <div class="kpi"><b>${k.seuil===null?'jamais':k.seuil+' pers.'}</b><span>seuil de rentabilité</span></div></div>
      ${a.m<0?'<div class="box warn">À ce prix, la prestation est déficitaire pour cet effectif.</div>':k.nulle?'<div class="box">Le prix est égal au coût variable par personne : chaque participant couvre exactement son coût (équilibre dès le premier payant), mais la marge est nulle.</div>':k.seuil===null?'<div class="box warn">Ce prix ne couvre pas les coûts variables : aucun effectif ne rend la prestation rentable.</div>':''}
      <table class="tb"><tr><th>Si le groupe compte</th><th>Coût</th><th>Recette</th><th>Marge</th></tr>${S.map(x=>{const r=k.at(k.prix,x);return `<tr${x===k.n?' class="sel"':''}><td>${x} payants</td><td>${eur(r.cost)}</td><td>${eur(r.ca)}</td><td>${eur(r.m)}</td></tr>`}).join('')}</table>`;
  };
  bindFields($('#bId'),b,e=>{saveItem();out();if(e&&e.dataset.k==='titre')$('#ttl').firstChild.textContent=e.value||'Nouveau budget'});
  bindFields($('#bM'),b,()=>{saveItem();out()});bindFields($('#bMine'),b,()=>{saveItem();out()});
  $('#bP').addEventListener('click',e=>{const p=e.target.dataset.take;if(!p)return;b.prix=String(p);$('#bMine [data-k="prix"]').value=b.prix;saveItem(true);out();toast('Prix retenu : '+eur(num(p)))});
  editList($('#bL'),b.lignes,[['poste','Poste de coût','text','wide'],['cat','Catégorie','select',BCAT],['mode','Mode de calcul','select',BMODE],['pu','Prix unitaire (€)','dec'],['qte','Quantité (repas, nuits, jours…)','dec'],['note','Fournisseur, remarque','text','wide']],
    {add:'＋ Ajouter un poste de coût',blank:()=>({id:uid(),poste:'',cat:'Entrées et visites',mode:'pp',pu:'',qte:'1'}),title:l=>l.poste||'Poste',after:out,
     intro:'Entrées, autocar, repas, honoraires, frais de repérage… Indiquez pour chaque poste s\'il se paie par personne ou en forfait pour le groupe.',
     extra:()=>'<div class="row" style="margin-top:10px"><span class="mute">Total du poste</span><span class="hr"></span></div>'});
  out();
  $('#iDel').onclick=()=>delItem('ce budget');$('#iDup').onclick=dupItem;
  $('#bPv').onclick=()=>preview({title:b.titre||'Budget',name:'Budget_'+slug(b.titre),blocks:budModel(b),back:'bud'});
  if($('#bFrom'))$('#bFrom').onclick=async()=>{const c=ctis.find(x=>x.id===b.ctiId);if(!c)return toast('Choisissez d\'abord le CTI lié');let n=0;const reps=(await live('reps')).map(fixRep);
    const add=(poste,cat,mode,pu,note)=>{if(b.lignes.some(l=>l.poste===poste))return;b.lignes.push({id:uid(),poste,cat,mode,pu:pu?String(pu):'',qte:'1',note:note||''});n++};
    for(const l of c.lignes){const r=l.repId&&reps.find(x=>x.id===l.repId);
      /* on ne retient qu'un nombre suivi de « € » : dans « Groupe de 20 minimum, 8 € », c'est 8, pas 20 */
      if(l.type==='arret'&&r){const src=String(r.d.t_grp||r.d.t_plein||''),m=src.replace(/,/g,'.').match(/(\d+(?:\.\d+)?)\s*(?:€|eur)/i);add('Entrée — '+(r.d.site||l.lieu),'Entrées et visites','pp',m?m[1]:'',src?'À CONFIRMER — tarif relevé au repérage : '+src:'Tarif à relever')}
      if(l.type==='repas')add('Repas — '+(l.lieu||'à préciser'),'Restauration','pa','','')}
    const km=ctiCalc(c).km;if(km)add('Transport ('+String(km).replace('.',',')+' km)','Transport','fixe','','Devis du transporteur à demander');
    add('Honoraires de guidage','Guidage et honoraires','fixe','','');
    if(!b.titre){b.titre=c.titre}saveItem(true);await VIEWS.bud.r();toast(n?n+' poste(s) proposé(s) : complétez les montants':'Tous les postes du CTI sont déjà dans le budget',4000)};
}};
function budModel(b){
  const k=budCalc(b),ml2=m=>(BMODE.find(x=>x[0]===m)||BMODE[0])[1],B=[{h1:b.titre||'Budget'},{meta:['Budget de prestation',k.n+' participants payants',k.acc?k.acc+' accompagnateur(s) non payant(s)':''].filter(Boolean).join(' · ')}];
  if(b.lignes.length)B.push({h2:'Coûts'},{grid:{w:[2800,1700,1900,900,700,1100],head:['Poste','Catégorie','Mode de calcul','Prix unitaire','Qté','Total'],rows:[...b.lignes.map(l=>[l.poste+(l.note?'\n'+l.note:''),l.cat||'',ml2(l.mode),eur(num(l.pu)),String(qty(l)).replace('.',','),eur(lineCost(l,k.n,k.acc))]),[{t:'Total',b:1},'','','','',{t:eur(k.total),b:1}]]}},
    {table:[...k.cats.map(([c,m])=>[c,eur(m)+(k.total?' — '+pct(m/k.total*100):'')]),['Coûts fixes du groupe',eur(k.fixe)],['Coûts variables par participant',eur(k.varPP)],['Coût de revient par participant payant',eur(k.rev)]]});
  if(k.props.length&&k.n&&k.total)B.push({h2:'Propositions de prix'},{p:'Taux de marge calculé '+(b.base==='cout'?'sur le coût':'sur le prix de vente')+'.'},{grid:{w:[2,2,2,2],head:['Taux de marge','Prix par personne','Recette','Marge'],rows:k.props.map(p=>[pct(p.t),{t:eur(p.p),b:1},eur(p.ca),eur(p.m)])}});
  if(k.prix&&k.n){const a=k.at(k.prix),S=[...new Set([k.n-10,k.n-5,k.n,k.n+5,k.n+10].filter(x=>x>0))];
    B.push({h2:'Prix retenu'},{table:[['Prix de vente par personne',eur(k.prix)],['Recette pour '+k.n+' payants',eur(a.ca)],['Marge',eur(a.m)+' — '+pct(a.sPv)+' du prix de vente, '+pct(a.sCout)+' du coût'],['Seuil de rentabilité',k.seuil===null?'non atteint à ce prix':k.seuil+' participants payants']]},
      {grid:{w:[2,2,2,2],head:['Effectif payant','Coût','Recette','Marge'],rows:S.map(x=>{const r=k.at(k.prix,x);return [{t:String(x),b:x===k.n},eur(r.cost),eur(r.ca),eur(r.m)]})}})}
  if(k.vides)B.splice(2,0,{p:'ATTENTION — budget incomplet : '+k.vides+' poste(s) sans montant, comptés pour zéro.'});
  B.push({small:'Montants sans traitement de la TVA. Budget établi avec Tiango – tiango.fr'});return B;
}
/* ================= LIEUX : durées, contraintes, budget partiel, liens ================= */
const strip=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const lieuNom=r=>(r&&r.d&&r.d.site)||'Site sans nom';
/* durée à prévoir sur le site : la valeur saisie, sinon la somme des durées des étapes */
const lieuDuree=r=>num(r.d.c_duree)||r.points.reduce((a,p)=>a+num(p.duree),0);
/* jours de fermeture lus dans le texte libre de la fiche : {days:Set, unknown:bool} */
function closedDays(txt){const t=strip(txt),days=new Set();if(!t.trim())return {days,unknown:false,ambig:false,guess:[]};
  const named=[];DAYS.forEach((d,i)=>{if(new RegExp('\\b'+d+'s?\\b').test(t))named.push(i)});if(/week-?end/.test(t)){named.push(0);named.push(6)}
  /* formulations qui ne se lisent pas « jours fermés = jours cités » : jamais de verdict bloquant, on demande confirmation */
  const ambig=/\b(sauf|excepte|hors|ouverte?s?|ouverture|seulement|uniquement|tous les jours|chaque jour|7j|7\/7)\b/.test(t)||/\bdu \w+ au \w+/.test(t);
  if(ambig){const all=[0,1,2,3,4,5,6],MON=[1,2,3,4,5,6,0],idx=w=>DAYS.findIndex(d=>w.startsWith(d.slice(0,3)));let guess=[];
    const rg=t.match(/\bdu (\w+) au (\w+)/),ouv=/\b(ouverte?s?|ouverture|seulement|uniquement)\b/.test(t);
    if(rg&&idx(rg[1])>=0&&idx(rg[2])>=0){const a=MON.indexOf(idx(rg[1])),z=MON.indexOf(idx(rg[2])),R=[];for(let i=a;;i=(i+1)%7){R.push(MON[i]);if(i===z)break}guess=ouv?all.filter(i=>!R.includes(i)):R}
    else if(/\bsauf|excepte|hors\b/.test(t)){const after=t.split(/\b(?:sauf|excepte|hors)\b/)[1]||'',ex=all.filter(i=>new RegExp('\\b'+DAYS[i]+'s?\\b').test(after));
      if(/\b(tous les jours|chaque jour|7j|7\/7)\b/.test(t.split(/\b(?:sauf|excepte|hors)\b/)[0])&&ex.length)guess=all.filter(i=>!ex.includes(i));else guess=named.filter(i=>!ex.includes(i))}
    else if(ouv)guess=all.filter(i=>!named.includes(i));
    else guess=named;
    return {days,unknown:false,ambig:true,guess}}
  named.forEach(i=>days.add(i));
  return {days,unknown:!days.size&&!/\b(aucun|aucune|neant|pas de fermeture|jamais)\b/.test(t),ambig:false,guess:[]}}
const wdOf=ds=>/^\d{4}-\d{2}-\d{2}$/.test(ds||'')?new Date(ds+'T12:00:00').getDay():null;
const addDays=(ds,n)=>{const d=new Date(ds+'T12:00:00');d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
/* Contraintes d'un site : {k,cat,lvl,ico,short,txt}.
   lvl « bloc » : incompatible avec ce qui est prévu ; « att » : à traiter ; « info » : à savoir.
   ctx : {date, part, pax} — plus il est précis, plus les contrôles le sont. */
function lieuFlags(r,ctx={}){
  const d=r.d,F=[],add=(cat,lvl,ico,short,txt)=>F.push({k:cat+':'+short,cat,lvl,ico,short,txt}),det=k=>d[k+'_d']?' — '+d[k+'_d']:'';
  /* accessibilité PMR */
  if(d.p_acc==='Non')add('pmr','bloc','♿','Non accessible PMR','Non accessible en fauteuil roulant'+det('p_acc'));
  else if(d.p_acc==='En partie')add('pmr','att','♿','PMR partiel','Accessible en partie seulement'+det('p_acc')+(d.p_chem?' ('+d.p_chem+')':''));
  else if(blank(d.p_acc))add('pmr','info','♿','PMR non renseigné','Accessibilité aux personnes à mobilité réduite non renseignée');
  /* accès en autocar */
  if(d.a_carok==='Non')add('car','bloc','🚌','Autocar impossible','Site inaccessible en autocar'+det('a_carok'));
  else if(d.a_carok==='En partie')add('car','att','🚌','Autocar limité','Accès en autocar limité'+det('a_carok'));
  else if(blank(d.a_carok))add('car','info','🚌','Autocar non renseigné','Accès en autocar non renseigné');
  if(d.a_car==='Non')add('car','att','🅿️','Pas de parking car','Pas de parking pour autocars'+det('a_car'));
  if(!blank(d.a_gabarit))add('car','att','🚌','Restriction de gabarit','Restrictions : '+d.a_gabarit);
  /* guide et réservation */
  if(d.g_site==='Oui')add('guide','att','🎧','Guide du site obligatoire','Guide du site obligatoire'+det('g_site'));
  if(d.g_conf==='Oui')add('guide','att','🪪','Carte de guide exigée','Carte de guide-conférencier exigée'+det('g_conf'));
  if(d.g_ext==='Non')add('guide','att','🎧','Commentaire extérieur interdit','Un guide extérieur n\'est pas autorisé à commenter'+det('g_ext'));
  if(d.g_parole==='Oui')add('guide','info','🎧','Droit de parole','Droit de parole payant ou à réserver'+det('g_parole'));
  if(d.t_resa==='Oui')add('resa','att','📞','Réservation obligatoire','Réservation obligatoire pour les groupes'+(d.t_delai?' (délai : '+d.t_delai+')':'')+det('t_resa'));
  /* fermetures */
  const cl=closedDays(d.h_ferm),wd=wdOf(ctx.date);
  if(cl.ambig)add('ferm','att','🚪','Fermeture à confirmer','Jours de fermeture écrits de façon ambiguë : « '+d.h_ferm+' »'+(cl.guess.length?' — lu comme fermé le '+cl.guess.map(i=>DAYS[i]).join(', ')+' : à confirmer. Écrivez simplement les jours fermés (ex. « mardi »).':'. Écrivez simplement les jours fermés (ex. « mardi »).'));
  else if(wd!==null&&cl.days.has(wd))add('ferm','bloc','🚪','Fermé ce jour','Fermé le '+DAYS[wd]+' ('+d.h_ferm+')');
  else if(cl.unknown)add('ferm','att','🚪','Fermeture à vérifier','Jours de fermeture à vérifier : '+d.h_ferm);
  else if(cl.days.size)add('ferm','info','🚪','Fermé '+[...cl.days].sort().map(i=>DAYS[i]).join(', '),'Fermeture hebdomadaire : '+d.h_ferm+(wd===null?' (date non fixée : à contrôler)':''));
  if(!blank(d.h_except))add('ferm','info','🚪','Fermetures exceptionnelles','Fermetures annuelles ou exceptionnelles : '+d.h_except);
  /* horaires d'ouverture et partie de la journée */
  const o=d.h_ouv?t2m(d.h_ouv):null,f=d.h_fer?t2m(d.h_fer):null;
  if(ctx.part&&o!==null&&f!==null){const h=hm(o)+' – '+hm(f);
    if(ctx.part==='matin'&&o>=720)add('hor','att','🕘','Ouvre trop tard','Ouvre à '+hm(o)+' : après la matinée ('+h+')');
    if(ctx.part==='apres'&&(f<=840||o>=1080))add('hor','att','🕘','Hors horaires l\'après-midi','Ouvert '+h+' : peu ou pas ouvert l\'après-midi');
    if(ctx.part==='soir'&&f<=1140)add('hor','att','🕘','Fermé le soir','Ferme à '+hm(f)+' : pas de visite en soirée');}
  /* autres contraintes */
  if(d.s_wc==='Non')add('autre','info','🚻','Pas de toilettes','Pas de toilettes sur place'+det('s_wc'));
  if(d.g_phones==='Oui')add('autre','info','🎧','Audiophones obligatoires','Audiophones obligatoires pour les groupes');
  if(d.x_meteo==='Oui'&&d.s_abri==='Non')add('autre','info','☔','Dépend de la météo','Visite dépendante de la météo, sans abri');
  if(d.x_ctrl==='Oui')add('autre','info','🛂','Contrôle de sécurité','Contrôle de sécurité à l\'entrée : prévoir du temps');
  const mx=num(d.t_grp_max);if(mx&&num(ctx.pax)>mx)add('autre','att','👥','Groupe trop grand','Effectif maximum par groupe : '+mx+' (le circuit en prévoit '+num(ctx.pax)+')');
  const gm=num(d.g_max);if(gm&&num(ctx.pax)>gm)add('autre','att','👥','Plusieurs guides','Effectif maximum par guide : '+gm+' : prévoir '+Math.ceil(num(ctx.pax)/gm)+' guides');
  return F}
const LVL={bloc:0,att:1,info:2};
const lvlName={bloc:'Incompatible',att:'À traiter',info:'À savoir'};

/* ---------- Budget partiel du site ---------- */
const BUD_SPEC=[['poste','Poste de coût','text','wide'],['cat','Catégorie','select',BCAT],['mode','Mode de calcul','select',BMODE],['pu','Prix unitaire (€)','dec'],['qte','Quantité','dec'],['note','Fournisseur, remarque','text','wide']];
const budBlank=()=>({id:uid(),poste:'',cat:'Entrées et visites',mode:'pp',pu:'',qte:'1'});
function drawBud(){
  const b=$('#budBox');if(!b)return;const rep=cur;
  editList(b,cur.bud,BUD_SPEC,{save:save,add:'＋ Ajouter un poste de coût',blank:budBlank,title:l=>l.poste||'Poste',after:counts,
    intro:'Coûts propres à ce site (entrée, guide du site, audioguides…). Ils sont repris dans le budget de chaque circuit qui passe ici.'});
  $('#budTar').innerHTML='<div class="row" style="margin-top:10px"><button class="btn sec sm" id="bTar">Proposer l\'entrée d\'après les tarifs de la fiche</button></div>';
  $('#bTar').onclick=()=>{const d=rep.d,src=String(d.t_grp||d.t_plein||''),m=src.replace(/,/g,'.').match(/(\d+(?:\.\d+)?)\s*(?:€|eur)/i);
    if(!src)return toast('Renseignez d\'abord un tarif dans « Tarifs et réservation »');
    if(rep.bud.some(l=>/^Entrée/.test(l.poste||'')))return toast('Une ligne « Entrée » existe déjà');
    rep.bud.push({id:uid(),poste:'Entrée',cat:'Entrées et visites',mode:'pp',pu:m?m[1]:'',qte:'1',note:'À CONFIRMER — tarif de la fiche : '+src});
    save(true);drawBud();counts();toast('Poste ajouté : confirmez le montant')};
}
/* ---------- Liens du site : circuits, repérages, visites ---------- */
async function usesOfLieu(id){const it=(await live('items')).map(fixItem),inC=c=>c.jours.some(j=>PARTS.some(([k])=>j.parts[k].some(e=>e.lieuId===id)));
  return {cir:it.filter(i=>i.kind==='cir'&&inC(i)),rpg:it.filter(i=>i.kind==='rpg'&&i.blocs.some(b=>b.lieuId===id)),vis:it.filter(i=>i.kind==='vis'&&i.lieuId===id),cti:it.filter(i=>i.kind==='cti'&&i.lignes.some(l=>l.repId===id))}}
async function drawUses(){
  const b=$('#usesBox');if(!b)return;const rep=cur,u=await usesOfLieu(rep.id);if(cur!==rep||!$('#usesBox'))return;
  const L=(t,a,k,lab)=>a.length?`<h3 style="margin:14px 0 6px;font-size:15px">${t}</h3>`+a.map(x=>`<div class="doc"><span class="n" role="button" tabindex="0" data-go="${k}" data-id="${esc(x.id)}">${esc(lab(x))}</span></div>`).join(''):'';
  b.innerHTML=`${u.vis.length?'':'<div class="row" style="margin-top:12px"><button class="btn acc grow" id="uSite">🎙️ Créer le discours de visite de ce site</button></div>'}<div class="row" style="margin-top:8px"><button class="btn sec grow" id="uRpg">🧭 Faire un repérage de ce site</button></div>
   ${L('Discours de visite',u.vis,'vis',x=>x.nom||'Discours sans titre')}${(()=>{const n=u.vis.reduce((a,x)=>a+visMiss(fixItem(x),rep).length,0);return n?`<div class="box warn" style="margin-top:8px">⚠ ${n} point${n>1?'s':''} de ce site ${n>1?'n\'ont':'n\'a'} pas encore de discours : ouvrez le discours pour les ajouter.</div>`:''})()}${L('Circuits',u.cir,'cir',x=>x.titre||'Circuit sans titre')}${L('Repérages',u.rpg,'rpg',x=>(x.titre||'Repérage')+(x.date?' · '+frDate(x.date):''))}${L('CTI',u.cti,'cti',x=>x.titre||'CTI sans titre')}
   ${u.cir.length+u.rpg.length+u.vis.length+u.cti.length?'':'<p class="mute">Ce site n\'est encore utilisé nulle part.</p>'}`;
  const n=u.cir.length+u.rpg.length+u.vis.length+u.cti.length,c=$('[data-c="uses"]');if(c){c.textContent=n;c.classList.toggle('full',n>0)}
  $$('[data-go]',b).forEach(e=>{e.onkeydown=k=>{if(k.key==='Enter')e.click()};e.onclick=()=>{if(e.dataset.go==='vis')visBack=['edit',rep.id];go(e.dataset.go,e.dataset.id)}});
  $('#uRpg').onclick=()=>newRpg({lieuId:rep.id});const us=$('#uSite');if(us)us.onclick=()=>discoursChoice(rep.id);
}
/* ================= ESPACE CIRCUITS : jours, parties de journée, sites, séjours, budget ================= */
const newJour=()=>({id:uid(),titre:'',debut:'09:00',sejId:'',depSrc:'',depAdr:'',finAdr:'',parts:{matin:[],apres:[],soir:[]}});
NEW.cir=()=>({id:uid(),kind:'cir',updated:Date.now(),titre:'',desc:'',pax:'20',acc:'1',depart:'',jours:[newJour()],sejours:[],bud:[]});
/* discours et formule choisis pour un site du programme */
const entVis=(e,V)=>{const vs=e.lieuId?V.filter(x=>x.lieuId===e.lieuId):[];return vs.find(x=>x.id===e.visId)||(vs.length===1?vs[0]:null)};
const entForm=(e,v)=>v&&e.fId?(v.formules.find(f=>f.id===e.fId)||null):null;
const entDuree=(e,r,V)=>{if(num(e.duree))return num(e.duree);if(e.t!=='lieu')return 0;const v=entVis(e,V),f=entForm(e,v),t=f?fTot(v,f).d:0;return t||(r?lieuDuree(r):0)};
/* lieu de prise en charge et de fin de journée */
const depEff=(c,ji)=>{const j=c.jours[ji];if(j.depSrc)return j.depSrc;return ji>0&&!j.depAdr&&c.jours[ji-1].sejId?'prev':''};
const sejTxt=(c,s,pres)=>{if(!s)return '';const p=pres.find(x=>x.id===s.presId);return (p&&p.nom)||s.nom||'Hébergement'};
function cirDep(c,ji,pres){const j=c.jours[ji],d=depEff(c,ji);
  if(d==='prev')return sejTxt(c,c.sejours.find(s=>s.id===c.jours[ji-1].sejId),pres);
  if(d.startsWith('p:')){const p=pres.find(x=>x.id===d.slice(2));return p?p.nom+(p.adresse?' ('+p.adresse+')':''):'(fiche supprimée)'}
  return j.depAdr||''}
function cirFin(c,ji,pres){const j=c.jours[ji],s=c.sejours.find(x=>x.id===j.sejId);return s?{nuit:1,txt:sejTxt(c,s,pres)}:{nuit:0,txt:j.finAdr||''}}
const cirLieuIds=c=>{const s=new Set();c.jours.forEach(j=>PARTS.forEach(([k])=>j.parts[k].forEach(e=>{if(e.t==='lieu'&&e.lieuId)s.add(e.lieuId)})));return [...s]};
KINDS.cir={list:'cirList',one:'circuit',ico:'🧭',empty:'Aucun circuit',hint:'Un circuit assemble des sites sur un ou plusieurs jours (matin, après-midi, soirée), avec ses séjours. Il fait remonter les contraintes des sites et sert de base aux CTI.',add:'＋ Nouveau circuit',ai:true,
  title:i=>i.titre||'Circuit sans titre',sub:i=>[num(i.pax)?'effectif de référence '+num(i.pax):''].filter(Boolean).join(' · '),
  pills:i=>[i.jours.length+' jour'+(i.jours.length>1?'s':''),cirLieuIds(i).length+' lieu'+(cirLieuIds(i).length>1?'x':'')]};
VIEWS.cirList={top:1,t:()=>'Tiango '+sub2('Circuits'),r:()=>renderItems('cir')};

/* ---------- Contraintes remontées sur le circuit ---------- */
const dayDate=(c,ji)=>c.depart?addDays(c.depart,ji):'';   /* anciens circuits seulement : le circuit est un modèle, la date appartient au CTI */
function circAlerts(c,L){const out=[];
  c.jours.forEach((j,ji)=>PARTS.forEach(([k,lab])=>j.parts[k].forEach(e=>{if(e.t!=='lieu')return;const where=`jour ${ji+1}, ${lab.toLowerCase()}`;
    if(!e.lieuId){out.push({lvl:'att',cat:'lieu',ico:'❓',short:'Site à choisir',txt:'Une ligne « lieu » n\'a pas de lieu choisi',lieu:'',where});return}
    const r=L.get(e.lieuId);if(!r){out.push({lvl:'bloc',cat:'lieu',ico:'❓',short:'Site introuvable',txt:'Ce site a été supprimé ou n\'existe plus sur cet appareil',lieu:'(lieu introuvable)',where});return}
    lieuFlags(r,{date:dayDate(c,ji),part:k,pax:c.pax}).forEach(f=>out.push({...f,lieu:lieuNom(r),where}))})));
  c.jours.forEach((j,ji)=>{if(ji<c.jours.length-1&&!j.sejId&&!j.finAdr&&c.jours.length>1)out.push({lvl:'info',cat:'sejour',ico:'🛏️',short:'Nuit sans hébergement',txt:'Aucun séjour pour la nuit du jour '+(ji+1),lieu:'',where:'jour '+(ji+1)})});
  c.sejours.forEach(s=>{if(!c.jours.some(j=>j.sejId===s.id))out.push({lvl:'info',cat:'sejour',ico:'🛏️',short:'Séjour sans nuit',txt:'Ce séjour n\'est affecté à aucune nuit',lieu:s.nom||'',where:''})});
  return out.sort((a,b)=>LVL[a.lvl]-LVL[b.lvl])}
/* verdict global sur un thème : ♿ accessibilité, 🚌 autocar */
function verdict(cat,al,nLieux){const A=al.filter(a=>a.cat===cat);
  const bad=A.filter(a=>a.lvl==='bloc'),mid=A.filter(a=>a.lvl==='att'),unk=A.filter(a=>a.lvl==='info');
  return bad.length?{s:'bad',txt:'NON',who:bad}:mid.length?{s:'mid',txt:'EN PARTIE',who:mid}:unk.length?{s:'unk',txt:'À VÉRIFIER',who:unk}:nLieux?{s:'ok',txt:'OUI',who:[]}:{s:'unk',txt:'—',who:[]}}
const whoTxt=w=>[...new Set(w.map(a=>a.lieu+(a.where?' ('+a.where+')':'')))].join(' ; ');

/* ---------- Budget du circuit : budgets partiels des sites + séjours + lignes propres ---------- */
function circLines(c,L){const lines=[],warn=[];
  c.jours.forEach((j,ji)=>PARTS.forEach(([k,lab])=>j.parts[k].forEach(e=>{const w=`jour ${ji+1}, ${lab.toLowerCase()}`;
    if(e.t==='lieu'){const r=L.get(e.lieuId);if(!r)return;if(!r.bud.length)warn.push('Aucun budget partiel renseigné pour « '+lieuNom(r)+' » ('+w+')');
      r.bud.forEach(l=>lines.push({...l,poste:lieuNom(r)+' — '+(l.poste||'poste'),src:'Lieu'}))}
    else if(e.t==='repas'&&!blank(e.pu))lines.push({id:uid(),poste:'Repas — jour '+(ji+1)+(e.note?' ('+e.note+')':''),cat:'Restauration',mode:'pa',pu:e.pu,qte:'1',src:'Repas'});
    else if(e.t==='autre'&&!blank(e.pu))lines.push({id:uid(),poste:(e.note||'Activité')+' — jour '+(ji+1),cat:'Divers',mode:'fixe',pu:e.pu,qte:'1',src:'Activité'});
    else if(e.t==='repas')warn.push('Repas du jour '+(ji+1)+' sans prix');})));
  c.sejours.forEach(s=>{const n=c.jours.filter(j=>j.sejId===s.id).length;if(!n)return;if(blank(s.pu))warn.push('Séjour « '+(s.nom||'sans nom')+' » sans prix par nuit');
    lines.push({id:s.id,poste:'Hébergement — '+(s.nom||'séjour')+' ('+n+' nuit'+(n>1?'s':'')+')',cat:'Hébergement',mode:s.mode||'pa',pu:s.pu,qte:String(n),src:'Séjour'})});
  c.bud.forEach(l=>lines.push({...l,src:'Circuit'}));
  return {lines,warn}}
const circCalc=(c,L)=>{const {lines,warn}=circLines(c,L);return {lines,warn,k:budCalc({lignes:lines,pax:c.pax,acc:c.acc,base:'pv',arr:'1',prix:''})}};

VIEWS.cir={item:1,back:'cirList',t:()=>esc(item.titre||'Nouveau circuit')+sub2('Circuit'),async r(){
  const c=item,all=(await live('items')).map(fixItem),reps=(await live('reps')).map(fixRep).filter(r=>!r.ctiId).sort((a,b)=>lieuNom(a).localeCompare(lieuNom(b),'fr'));
  if(item!==c||view!=='cir')return;
  const L=new Map(reps.map(r=>[r.id,r])),pres=all.filter(i=>i.kind==='pre').sort((a,b)=>String(a.nom).localeCompare(String(b.nom),'fr')),
    V=vis_(all),ctis=all.filter(i=>i.kind==='cti'&&i.circId===c.id),rpgs=all.filter(i=>i.kind==='rpg'&&i.circId===c.id),buds=all.filter(i=>i.kind==='bud'&&i.circId===c.id);
  if(!OPEN.has('k_init')){OPEN.add('k_init');OPEN.add(c.titre?'k_jr':'k_id')}
  $('#main').innerHTML=`<div class="card"><div id="cAl"></div>
    <div class="row" style="margin-top:12px"><button class="btn grow" id="cPv">📄 Aperçu et export</button><button class="btn sec grow" id="cRpg">🧭 Repérer ce circuit</button></div></div>
   ${sec('k_id','🧾','Le circuit',`<div class="grid" id="kId">${[['titre','Intitulé du circuit','text','wide'],['desc','Thème, public, esprit du circuit','textarea'],['pax','Effectif de référence (sert au budget : chaque sortie a son effectif réel dans le CTI)','number'],['acc','Accompagnateurs prévus, non payants (guide, chauffeur…) : indication','number']].map(f=>field(f,c,'ck_')).join('')}</div>`)}
   ${sec('k_jr','📅','Jours et programme','<div id="cJ"></div>',String(c.jours.length))}
   ${sec('k_sj','🛏️','Séjours (hôtel, camping…)','<div id="cS"></div>',String(c.sejours.length))}
   ${sec('k_bd','💶','Budget du circuit','<div id="cB"></div><h3 style="margin:16px 0 0;font-size:15px">Postes propres au circuit (transport, guide, imprévus…)</h3><div id="cBL"></div><div id="cBA"></div>')}
   ${sec('k_ed','🗺️','Éditions : les CTI de ce circuit','<div id="cE"></div>',String(ctis.length))}
   ${sec('k_rp','🧭','Repérages de ce circuit','<div id="cR"></div>',String(rpgs.length))}${delBtn}`;
  bindSecs();
  const nm=r=>lieuNom(r);
  const lieuOpts=v=>`<option value="">— choisir un site —</option>${reps.map(r=>`<option value="${esc(r.id)}"${r.id===v?' selected':''}>${esc(nm(r))}${r.d.ville?' ('+esc(r.d.ville)+')':''}</option>`).join('')}${v&&!L.has(v)?`<option value="${esc(v)}" selected>(lieu introuvable)</option>`:''}<option value="__new">＋ Créer un nouveau site…</option>`;
  const presOpts=(role,v)=>{const P=pres.filter(p=>!role||p.role===role);return `<option value="">— aucun —</option>${P.map(p=>`<option value="${esc(p.id)}"${p.id===v?' selected':''}>${esc(p.nom||'Sans nom')}${p.tel?' · '+esc(p.tel):''}</option>`).join('')}`};
  const pills=fl=>fl.filter(f=>f.lvl!=='info').map(f=>`<span class="pill ${f.lvl==='bloc'?'bad':'mid'}" title="${esc(f.txt)}">${esc(f.ico+' '+f.short)}</span>`).join('');
  /* ----- alertes en tête ----- */
  const drawAl=()=>{const al=circAlerts(c,L),n=cirLieuIds(c).length,vp=verdict('pmr',al,n),vc=verdict('car',al,n),V=(ico,t,v)=>`<div class="vd ${v.s}"><b>${ico} ${t} : ${v.txt}</b>${v.who.length?`<span>${esc(whoTxt(v.who))}</span>`:''}</div>`;
    const rest=al.filter(a=>a.cat!=='pmr'&&a.cat!=='car'&&a.lvl!=='info'),inf=al.filter(a=>a.lvl==='info'&&a.cat!=='pmr'&&a.cat!=='car');
    $('#cAl').innerHTML=n?`<div class="vds">${V('♿','Accessible PMR',vp)}${V('🚌','Accessible en autocar',vc)}</div>
      ${rest.length?`<h3 style="margin:12px 0 4px;font-size:15px">Contraintes remontées des sites</h3>${rest.map(a=>`<div class="al ${a.lvl}"><b>${esc(a.ico+' '+a.short)}</b> — ${esc(a.lieu)}${a.where?' <span class="mute">('+esc(a.where)+')</span>':''}<div class="mute">${esc(a.txt)}</div></div>`).join('')}`:'<p class="mute" style="margin:10px 0 0">Aucune autre contrainte à traiter.</p>'}
      ${inf.length?`<details style="margin-top:8px"><summary class="mute">${inf.length} information${inf.length>1?'s':''} à savoir</summary>${inf.map(a=>`<div class="al info"><b>${esc(a.ico+' '+a.short)}</b> — ${esc(a.lieu)}${a.where?' <span class="mute">('+esc(a.where)+')</span>':''}<div class="mute">${esc(a.txt)}</div></div>`).join('')}</details>`:''}`
      :'<p class="mute" style="margin:0">Ajoutez des sites au programme : leurs contraintes (accessibilité, autocar, fermetures, réservation, guide) remontent ici automatiquement.</p>'};
  /* ----- jours ----- */
  const entryHTML=(e,ji,k,ei,len)=>{const a=`data-j="${ji}" data-p="${k}" data-e="${ei}"`;let b='';
    const ty=`<select data-ef="t" aria-label="Nature de la ligne">${[['lieu','Lieu'],['libre','Temps libre'],['repas','Repas'],['autre','Autre activité']].map(([v,l])=>`<option value="${v}"${e.t===v?' selected':''}>${l}</option>`).join('')}</select>`;
    if(e.t==='lieu'){const r=L.get(e.lieuId),fl=r?lieuFlags(r,{date:dayDate(c,ji),part:k,pax:c.pax}):[];
      const vs=e.lieuId?V.filter(x=>x.lieuId===e.lieuId):[],ev=entVis(e,V),ef=entForm(e,ev),auto=entDuree({...e,duree:''},r,V);
      const vSel=vs.length>1?`<div class="f"><label>Discours de visite</label><select data-ef="visId"><option value="">— choisir —</option>${vs.map(x=>`<option value="${esc(x.id)}"${ev&&ev.id===x.id?' selected':''}>${esc((x.nom||'Discours')+(x.public?' · '+x.public:''))}</option>`).join('')}</select></div>`:'',
        fSel=ev&&ev.formules.length?`<div class="f"><label>Formule de visite${vs.length===1?' ('+esc(ev.nom||'discours')+')':''}</label><select data-ef="fId"><option value="">Discours complet${ev.modules.length?' · '+mins(ev.modules.reduce((a,m)=>a+num(m.duree),0)||0):''}</option>${ev.formules.map(f=>`<option value="${esc(f.id)}"${ef&&ef.id===f.id?' selected':''}>${esc(f.nom||'Formule')} · ${mins(fTot(ev,f).d)}</option>`).join('')}</select></div>`:'';
      b=`<select data-ef="lieuId" aria-label="Lieu">${lieuOpts(e.lieuId)}</select><div class="grid">${vSel}${fSel}<div class="f"><label>Durée retenue (min)</label><input data-ef="duree" type="number" inputmode="numeric" min="0" value="${esc(e.duree||'')}" placeholder="${auto||''}"></div><div class="f"><label>Remarque</label><input data-ef="note" value="${esc(e.note||'')}"></div></div>
       <div class="pills">${pills(fl)}</div>${r?'':e.lieuId?'<div class="box warn">Ce site est introuvable : restaurez-le depuis la corbeille ou choisissez-en un autre.</div>':''}`}
    else if(e.t==='repas')b=`<select data-ef="presId" aria-label="Restaurant">${presOpts('Restaurant',e.presId)}</select><div class="grid"><div class="f"><label>Prix par personne (€)</label><input data-ef="pu" type="number" inputmode="decimal" min="0" step="any" value="${esc(e.pu||'')}"></div><div class="f"><label>Durée (min)</label><input data-ef="duree" type="number" inputmode="numeric" min="0" value="${esc(e.duree||'')}" placeholder="60"></div><div class="f wide"><label>Remarque (menu, allergies, horaire de réservation)</label><input data-ef="note" value="${esc(e.note||'')}"></div></div>`;
    else if(e.t==='autre')b=`<div class="grid"><div class="f wide"><label>Activité (spectacle, dégustation, croisière…)</label><input data-ef="note" value="${esc(e.note||'')}"></div><div class="f"><label>Durée (min)</label><input data-ef="duree" type="number" inputmode="numeric" min="0" value="${esc(e.duree||'')}"></div><div class="f"><label>Coût, forfait groupe (€)</label><input data-ef="pu" type="number" inputmode="decimal" min="0" step="any" value="${esc(e.pu||'')}"></div></div>`;
    else b=`<div class="grid"><div class="f wide"><label>Temps libre (à quoi est-il consacré ?)</label><input data-ef="note" value="${esc(e.note||'')}" placeholder="Déjeuner libre, shopping, repos…"></div><div class="f"><label>Durée (min)</label><input data-ef="duree" type="number" inputmode="numeric" min="0" value="${esc(e.duree||'')}"></div></div>`;
    return `<div class="en" ${a}><div class="row" style="gap:6px">${ty}<button class="mini" data-ea="up" aria-label="Monter"${ei?'':' disabled'}>↑</button><button class="mini" data-ea="dn" aria-label="Descendre"${ei<len-1?'':' disabled'}>↓</button><button class="mini" data-ea="rm" aria-label="Supprimer cette ligne">🗑</button></div>${b}</div>`};
  const dayTot=j=>PARTS.reduce((t,[k])=>t+j.parts[k].reduce((a,e)=>a+(e.t==='lieu'?entDuree(e,L.get(e.lieuId),V):num(e.duree)),0),0);
  const drawJ=()=>{const b=$('#cJ');
    b.innerHTML=`<p class="mute" style="margin:12px 0 0">Chaque jour a trois parties. Une partie peut contenir un ou plusieurs sites, un repas, du temps libre, ou rester vide.</p>`+c.jours.map((j,ji)=>`<div class="pt jr" data-j="${ji}"><div class="hd"><span class="num">${ji+1}</span><input data-jf="titre" value="${esc(j.titre||'')}" placeholder="Jour ${ji+1} — thème (facultatif)" aria-label="Titre du jour ${ji+1}">
      <button class="mini" data-ja="up" aria-label="Monter ce jour"${ji?'':' disabled'}>↑</button><button class="mini" data-ja="dn" aria-label="Descendre ce jour"${ji<c.jours.length-1?'':' disabled'}>↓</button><button class="mini" data-ja="rm" aria-label="Supprimer ce jour">🗑</button></div>
      <div class="grid"><div class="f"><label>Heure de prise en charge du groupe</label><input data-jf="debut" type="time" value="${esc(j.debut||'')}"></div><div class="f"><label>Lieu de prise en charge</label><select data-jf="depSrc">${depOpts(ji)}</select></div>
        ${depEff(c,ji)===''?`<div class="f wide"><label>Adresse ou description du lieu (gare, parking, adresse…)</label><input data-jf="depAdr" value="${esc(j.depAdr||'')}" placeholder="Ex. Gare de Saint-Malo, parvis"></div>`:''}
        <div class="f"><label>Hébergement du soir (facultatif)</label><select data-jf="sejId"><option value="">— aucun —</option>${c.sejours.map(s=>`<option value="${esc(s.id)}"${s.id===j.sejId?' selected':''}>${esc(sejNom(s))}</option>`).join('')}</select></div>
        ${j.sejId?'':`<div class="f"><label>Fin de journée : lieu de dépose</label><input data-jf="finAdr" value="${esc(j.finAdr||'')}" placeholder="Gare, parking, adresse…"></div>`}</div>
      <div class="mute" style="margin-top:4px">${c.depart?'<b>'+new Date(dayDate(c,ji)+'T12:00').toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})+'</b> · ':''}${dayTot(j)?'sur place : '+mins(dayTot(j)):'durées non renseignées'}</div>
      ${PARTS.map(([k,lab,ico])=>`<div class="part" data-part="${k}"><h4>${ico} ${lab}</h4>${j.parts[k].length?j.parts[k].map((e,ei)=>entryHTML(e,ji,k,ei,j.parts[k].length)).join(''):'<p class="mute" style="margin:4px 0">Rien de prévu.</p>'}
        <div class="row" style="margin-top:6px;gap:6px;flex-wrap:wrap">${[['lieu','＋ Site'],['repas','＋ Repas'],['libre','＋ Temps libre'],['autre','＋ Autre']].map(([t,l])=>`<button class="btn sec sm" data-add="${t}" data-j="${ji}" data-p="${k}">${l}</button>`).join('')}</div></div>`).join('')}</div>`).join('')
      +`<div class="row" style="margin-top:12px"><button class="btn sec grow" id="cAddJ">＋ Ajouter un jour</button></div>`;
    setCnt('k_jr',String(c.jours.length));
    $('#cAddJ').onclick=()=>{c.jours.push(newJour());saveItem(true);drawJ();refresh()}};
  const sejNom=s=>{const p=pres.find(x=>x.id===s.presId);return (p&&p.nom)||s.nom||'Séjour sans nom'};
  const depOpts=ji=>{const d=depEff(c,ji),prev=ji>0?c.sejours.find(s=>s.id===c.jours[ji-1].sejId):null;
    return `<option value=""${d===''?' selected':''}>Adresse libre</option>${prev?`<option value="prev"${d==='prev'?' selected':''}>Hébergement de la veille : ${esc(sejNom(prev))}</option>`:''}${pres.length?`<optgroup label="Annuaire">${pres.map(p=>`<option value="p:${esc(p.id)}"${d==='p:'+p.id?' selected':''}>${esc((p.nom||'Sans nom')+' · '+p.role)}</option>`).join('')}</optgroup>`:''}`};
  const J=$('#cJ'),EL=el=>{const x=el.closest('[data-j]');return x?{ji:+x.dataset.j,j:c.jours[+x.dataset.j],k:x.dataset.p,ei:x.dataset.e===undefined?-1:+x.dataset.e}:null};
  J.addEventListener('input',e=>{const t=e.target,w=EL(t);if(!w)return;
    if(t.dataset.jf&&t.tagName!=='SELECT'){w.j[t.dataset.jf]=t.value;saveItem();refresh(true)}
    if(t.dataset.ef&&t.tagName!=='SELECT'){w.j.parts[w.k][w.ei][t.dataset.ef]=t.value;saveItem();refresh(true)}});
  J.addEventListener('change',async e=>{const t=e.target,w=EL(t);if(!w)return;
    if(t.dataset.jf&&t.tagName==='SELECT'){w.j[t.dataset.jf]=t.value;if(t.dataset.jf==='depSrc'&&t.value)w.j.depAdr='';saveItem(true);drawJ();refresh()}
    if(t.dataset.ef){const en=w.j.parts[w.k][w.ei],f=t.dataset.ef;
      if(f==='lieuId'&&t.value==='__new'){if(!(await gate('reps'))){t.value=en.lieuId||'';return}const r={id:uid(),created:Date.now(),updated:Date.now(),d:{pays:'France',date:''},gps:null,points:[],bud:[],np:0,nd:0,cover:''};await DB.put('reps',r);en.lieuId=r.id;await saveItem(true);toast('Nouveau site créé : donnez-lui un nom');return openLieu(r.id,['cir',c.id])}
      if(f==='t'){en.t=t.value;if(en.t==='repas'&&blank(en.duree))en.duree='60'}else{en[f]=t.value;if(f==='lieuId'){en.visId='';en.fId=''}if(f==='visId')en.fId=''}saveItem(true);drawJ();refresh()}});
  J.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const w=EL(t);if(!w)return;
    if(t.dataset.add){w.j.parts[w.k].push({id:uid(),t:t.dataset.add,lieuId:'',presId:'',duree:t.dataset.add==='repas'?'60':'',note:'',pu:''});saveItem(true);drawJ();refresh();
      const last=$$(`#cJ [data-j="${w.ji}"] [data-part="${w.k}"] .en`).pop();const f=last&&$('select:not([data-ef="t"]),input',last);f&&f.focus({preventScroll:true});return}
    if(t.dataset.ea){const A=w.j.parts[w.k],i=w.ei;
      if(t.dataset.ea==='up'&&i>0)A.splice(i-1,0,A.splice(i,1)[0]);
      if(t.dataset.ea==='dn'&&i<A.length-1)A.splice(i+1,0,A.splice(i,1)[0]);
      if(t.dataset.ea==='rm')A.splice(i,1);saveItem(true);drawJ();refresh();return}
    if(t.dataset.ja){const i=w.ji,mv=()=>{saveItem(true);drawJ();refresh()};
      if(t.dataset.ja==='up'&&i>0){c.jours.splice(i-1,0,c.jours.splice(i,1)[0]);mv()}
      if(t.dataset.ja==='dn'&&i<c.jours.length-1){c.jours.splice(i+1,0,c.jours.splice(i,1)[0]);mv()}
      if(t.dataset.ja==='rm'){const n=PARTS.reduce((a,[k])=>a+w.j.parts[k].length,0);
        if(c.jours.length<2)return toast('Un circuit comporte au moins un jour');
        confirmBox('Supprimer le jour '+(i+1)+' ?',n?'Ses '+n+' ligne(s) de programme seront perdues.':'Ce jour est vide.','Supprimer',()=>{c.jours.splice(i,1);mv()})}}});
  /* ----- séjours ----- */
  const nuits=s=>c.jours.filter(j=>j.sejId===s.id).length;
  const drawS=editList($('#cS'),c.sejours,[['type','Nature du séjour','select',SEJ_TYPES],['presId','Fiche de l\'annuaire (hébergement)','select',pres.filter(p=>p.role==='Hébergement').map(p=>[p.id,(p.nom||'Sans nom')+(p.tel?' · '+p.tel:'')])],['nom','Nom (si absent de l\'annuaire)','text','wide'],
      ['mode','Prix par nuit calculé','select',BMODE],['pu','Prix par nuit (€)','dec'],['note','Réservation, petit-déjeuner, taxe de séjour, remarque','textarea']],
    {add:'＋ Ajouter un séjour',blank:()=>({id:uid(),type:'Hôtel',nom:'',presId:'',mode:'pa',pu:'',note:''}),title:s=>sejNom(s),after:()=>{setCnt('k_sj',String(c.sejours.length));drawJ();refresh()},
     intro:'Chaque séjour s\'affecte ensuite à une ou plusieurs nuits, dans « Jours et programme ». Les hébergements se créent dans l\'annuaire (menu ☰).',
     extra:s=>`<div class="mute" style="margin-top:6px">${nuits(s)} nuit${nuits(s)>1?'s':''} affectée${nuits(s)>1?'s':''}</div>`});
  /* ----- budget ----- */
  const drawBudget=()=>{const {lines,warn,k}=circCalc(c,L);setCnt('k_bd','');
    $('#cB').innerHTML=`<div class="kpis"><div class="kpi hi"><b>${eur(k.total)}</b><span>coût total pour ${k.n} payants</span></div><div class="kpi"><b>${eur(k.rev)}</b><span>coût de revient par payant</span></div></div>
      ${warn.length?`<div class="box warn"><b>Budget incomplet.</b><br>${[...new Set(warn)].slice(0,8).map(esc).join('<br>')}</div>`:''}
      ${lines.length?`<table class="tb"><tr><th>Poste</th><th>Calcul</th><th>Total</th></tr>${lines.map(l=>`<tr><td>${esc(l.poste||'Poste')}${blank(l.pu)?' <span class="pill mid">sans montant</span>':''}<div class="mute">${esc(l.src)}</div></td><td>${esc(num(l.pu)?eur(num(l.pu))+' × '+String(qty(l)).replace('.',',')+(l.mode==='fixe'?' (forfait)':l.mode==='pa'?' / pers. (accomp. compris)':' / payant'):'—')}</td><td>${eur(lineCost(l,k.n,k.acc))}</td></tr>`).join('')}<tr class="sel"><td>Total</td><td></td><td>${eur(k.total)}</td></tr></table>`:'<p class="mute">Les coûts des sites (budget partiel), des séjours et des repas s\'additionnent ici.</p>'}`;
    const bb=$('#cBA');bb.innerHTML=`<div class="row" style="margin-top:12px"><button class="btn sec grow" id="cMkB"${lines.length?'':' disabled'}>💶 Créer un budget de vente à partir de ce circuit</button></div>${buds.length?`<p class="mute">Budgets déjà créés : ${buds.map(x=>`<a href="#" data-bud="${esc(x.id)}">${esc(x.titre||'Budget')}</a>`).join(', ')}</p>`:''}`;
    $$('[data-bud]',bb).forEach(a=>a.onclick=e=>{e.preventDefault();go('bud',a.dataset.bud)});
    $('#cMkB').onclick=async()=>{const {lines}=circCalc(c,L),b=NEW.bud();Object.assign(b,{titre:c.titre||'Circuit',pax:String(c.pax||''),acc:String(c.acc||''),circId:c.id,lignes:lines.map(({src,...l})=>({...l,id:uid()}))});
      await flushAll();await DB.put('items',b);toast('Budget créé : fixez maintenant votre marge');go('bud',b.id)}};
  editList($('#cBL'),c.bud,BUD_SPEC,{add:'＋ Ajouter un poste',blank:budBlank,title:l=>l.poste||'Poste',after:drawBudget});
  /* ----- éditions et CTI ----- */
  const drawE=()=>{const eds=[...new Set(ctis.map(x=>x.ed||''))];
    $('#cE').innerHTML=`<p class="mute" style="margin:12px 0 0">Une édition est une réalisation du circuit (dates, groupe, prestataires). Tiango crée un CTI par jour, avec les sites, leurs durées, les contraintes et les contacts connus. Les CTI sont ensuite des copies : modifier le circuit ne les modifie pas.</p>
      ${eds.map(ed=>`<h3 style="margin:14px 0 6px;font-size:15px">${esc(ed||'Sans nom d\'édition')}</h3>${ctis.filter(x=>(x.ed||'')===ed).sort((a,b)=>num(a.jour)-num(b.jour)).map(x=>`<div class="doc"><span class="n" role="button" tabindex="0" data-cti="${esc(x.id)}">Jour ${num(x.jour)||'?'} · ${esc(x.date?frDate(x.date):'sans date')} · ${esc(x.titre||'CTI')}</span></div>`).join('')}`).join('')}
      <div class="row" style="margin-top:12px"><button class="btn acc grow" id="cMkC">＋ Créer les CTI d'une édition</button></div>`;
    $$('[data-cti]').forEach(e=>{e.onkeydown=k=>{if(k.key==='Enter')e.click()};e.onclick=()=>go('cti',e.dataset.cti)});
    $('#cMkC').onclick=()=>editionSheet()};
  const editionSheet=()=>{const d={ed:'',date:c.depart||today(),pax:String(c.pax||'')};
    const ids=new Set();c.jours.forEach(j=>PARTS.forEach(([k])=>(j.parts[k]||[]).forEach(e=>{if(e.t==='lieu'&&e.lieuId)ids.add(e.lieuId)})));
    const vSites=[...ids].map(id=>{const r=L.get(id);return r?{id,nom:lieuNom(r),L:vis_(all).filter(x=>x.lieuId===id),pref:(()=>{for(const j of c.jours)for(const k of ['matin','apres','soir'])for(const e of j.parts[k])if(e.lieuId===id&&e.visId)return e.visId;return ''})()}:null}).filter(x=>x&&x.L.length);
    const vNeed=vSites.filter(x=>x.L.length>1&&!x.pref),recap=[];
    c.jours.forEach(j=>PARTS.forEach(([k])=>j.parts[k].forEach(e=>{if(e.t!=='lieu')return;const r=L.get(e.lieuId);if(!r)return;const ev=entVis(e,V),fo=entForm(e,ev);if(!ev)return;
      const t=lieuNom(r)+' : '+(fo?(fo.nom||'formule')+' · '+mins(fTot(ev,fo).d):'discours complet');if(!recap.includes(t))recap.push(t)})));
    $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Créer les CTI"><div class="sheet"><h2>Créer les CTI d'une édition</h2><p class="mute">Un CTI sera créé pour chacun des ${c.jours.length} jour(s) du circuit.</p>
      <div class="grid" id="edF">${[['ed','Nom de l\'édition (groupe, période)','text','wide'],['date','Date du premier jour','date'],['pax','Effectif','number']].map(f=>field(f,d,'ed_')).join('')}</div>
      ${recap.length?`<div class="f wide" style="margin-top:12px"><b>Visites retenues dans le circuit</b><ul style="margin:6px 0 0;padding-left:18px">${recap.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p class="mute" style="margin:6px 0 0">Le discours et la formule choisis dans le circuit sont repris tels quels dans chaque CTI ; ils restent modifiables ligne par ligne dans le CTI.</p></div>`:''}
      ${vNeed.length?`<div class="f wide" style="margin-top:12px"><b>Discours à choisir</b><p class="mute" style="margin:4px 0 8px">Ces sites ont plusieurs discours et aucun n'est choisi dans le circuit.</p>${vNeed.map(s=>`<div class="f"><label for="vm_${esc(s.id)}">${esc(s.nom)}</label><select id="vm_${esc(s.id)}" data-vm="${esc(s.id)}"><option value="">— choisir —</option><option value="-">Aucun discours</option>${s.L.map(x=>`<option value="${esc(x.id)}">${esc((x.nom||'Discours')+' · '+(x.langs||[]).join('/').toUpperCase()+(x.public?' · '+x.public:''))}</option>`).join('')}</select></div>`).join('')}</div>`:''}
      <div class="row" style="margin-top:14px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn grow" id="mOk">Créer</button></div></div></div>`;
    bindFields($('#edF'),d);$('#mNo').onclick=closeModal;
    $('#mOk').onclick=async()=>{if(blank(d.ed))return toast('Donnez un nom à l\'édition (ex. Groupe ABC, mai 2027)');
      const vm={};for(const e of $$('[data-vm]')){if(!e.value)return toast('Choisissez le discours à lier pour « '+(vSites.find(s=>s.id===e.dataset.vm)||{}).nom+' » (ou « Aucun discours »)',5000);vm[e.dataset.vm]=e.value==='-'?'':e.value}
      vSites.forEach(x=>{if(x.pref&&!(x.id in vm))vm[x.id]=x.pref});closeModal();d.vm=vm;
      if(!(await gate('cti',c.jours.length)))return;await flushAll();const out=[];for(let ji=0;ji<c.jours.length;ji++)out.push(ctiFromDay(c,ji,L,pres,vis_(all),{ed:d.ed.trim(),date:d.date,pax:d.pax,vm:d.vm}));
      await txm(['items'],S=>out.forEach(x=>S('items').put(x)));toast(out.length+' CTI créé'+(out.length>1?'s':''),4000);await VIEWS.cir.r()}};
  /* ----- repérages ----- */
  const drawR=()=>{$('#cR').innerHTML=`${rpgs.length?rpgs.sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(x=>`<div class="doc"><span class="n" role="button" tabindex="0" data-rpg="${esc(x.id)}">${esc(x.titre||'Repérage')} · ${esc(frDate(x.date))}${x.applied&&x.applied.t?' · sites mis à jour':''}</span></div>`).join(''):'<p class="mute">Aucun repérage de ce circuit pour l\'instant.</p>'}
    <div class="row" style="margin-top:12px"><button class="btn sec grow" id="cRpg2">🧭 Repérer ce circuit</button></div>`;
    $$('[data-rpg]').forEach(e=>{e.onkeydown=k=>{if(k.key==='Enter')e.click()};e.onclick=()=>go('rpg',e.dataset.rpg)});$('#cRpg2').onclick=()=>newRpg({circId:c.id})};
  /* ----- liaison ----- */
  const refresh=light=>{drawAl();drawBudget();if(!light){$$('#cS .xtra').forEach((x,i)=>{if(c.sejours[i])x.innerHTML=`<div class="mute" style="margin-top:6px">${nuits(c.sejours[i])} nuit${nuits(c.sejours[i])>1?'s':''} affectée${nuits(c.sejours[i])>1?'s':''}</div>`})}};
  bindFields($('#kId'),c,e=>{saveItem();refresh(true);if(e&&e.dataset.k==='titre')$('#ttl').firstChild.textContent=e.value||'Nouveau circuit';if(e&&e.dataset.k==='depart')drawJ()});
  drawJ();drawE();drawR();refresh();
  $('#cPv').onclick=()=>preview({title:c.titre||'Circuit',name:'Circuit_'+slug(c.titre),blocks:cirModel(c,L,pres,V),landscape:true,back:'cir'});
  $('#cRpg').onclick=()=>newRpg({circId:c.id});
  $('#iDel').onclick=()=>delItem('ce circuit');$('#iDup').onclick=dupItem;
}};
const vis_=all=>all.filter(i=>i.kind==='vis');

/* ---------- CTI d'un jour de circuit ---------- */
function pratiques(d){const y=k=>[d[k],d[k+'_d']].filter(Boolean).join(' — ');
  return [['Parking cars',[y('a_car'),d.a_car_d].filter(Boolean).join(' — ')],['Dépose',y('a_depose')],['Rendez-vous',d.a_rdv],['Toilettes',[y('s_wc'),d.s_wc_d].filter(Boolean).join(' — ')],['Accès fauteuil',y('p_acc')],['Cheminement',d.p_chem],['Vigilance',d.x_risq],['Réservation',y('t_resa')],['Repli',d.x_planb]].filter(x=>x[1])}
function ctiFromDay(c,ji,L,pres,vis,o){
  const j=c.jours[ji],t=NEW.cti(),P=id=>pres.find(p=>p.id===id),date=o.date?addDays(o.date,ji):'',lg=[],ct=[];
  const sejPrev=ji>0?c.sejours.find(s=>s.id===c.jours[ji-1].sejId):null,sejNow=c.sejours.find(s=>s.id===j.sejId);
  const sn=s=>{const p=s&&P(s.presId);return s?((p&&p.nom)||s.nom||''):''};
  const dep=cirDep(c,ji,pres),fin=cirFin(c,ji,pres);
  lg.push({id:uid(),type:'pec',nature:LT.pec[1],lieu:dep?'Prise en charge : '+dep:'',duree:''});
  const addContact=x=>{if(!ct.some(y=>(x.presId&&y.presId===x.presId)||(x.lieuId&&y.lieuId===x.lieuId)))ct.push({id:uid(),...x})};
  if(sejPrev&&sejPrev.presId)addContact({role:'Hébergement',presId:sejPrev.presId,note:'Nuit précédente'});
  PARTS.forEach(([k,lab])=>j.parts[k].forEach(e=>{
    if(e.t==='lieu'){const r=L.get(e.lieuId);if(!r)return;
      lg.push({id:uid(),type:'trajet',nature:LT.trajet[1],lieu:'Vers '+lieuNom(r),duree:'',km:'',itin:r.d.a_itin||'',todo:'Temps et kilométrage de ce trajet à renseigner'});
      const fl=lieuFlags(r,{date,part:k,pax:o.pax}).filter(f=>f.lvl!=='info').map(f=>'⚠ '+f.txt),rem=[...pratiques(r.d).map(x=>x[0]+' : '+x[1]),...fl];
      const v=vis.find(x=>x.id===e.visId&&x.lieuId===r.id)||(o.vm&&r.id in o.vm?vis.find(x=>x.id===o.vm[r.id]):null)||entVis(e,vis),fo=v&&e.fId?v.formules.find(f=>f.id===e.fId):null;
      const arr={id:uid(),type:'arret',nature:LT.arret[1],lieu:lieuNom(r),duree:String(num(e.duree)||(fo?fTot(v,fo).d:0)||lieuDuree(r)||''),repId:r.id,visId:v?v.id:'',fId:fo?fo.id:'',contenu:r.d.c_themes||'',rem:rem.join('\n')+(e.note?'\n'+e.note:''),
        todo:'',itin:''};
      const sb=v&&ctiCanDetail(arr,v)?ctiSubs(arr,v):null,tot=sb?sb.reduce((n,x)=>n+num(x.duree),0):0;
      if(sb&&(!num(e.duree)||num(e.duree)===tot))lg.push(...sb);else lg.push(arr);   /* détail automatique, sauf durée imposée différente */
      addContact({role:'Site',lieuId:r.id,note:r.d.contact||''})}
    else if(e.t==='repas'){const p=P(e.presId);lg.push({id:uid(),type:'repas',nature:LT.repas[1],lieu:(p&&p.nom)||e.note||'Repas',duree:String(num(e.duree)||60),rem:[p&&p.tel?'Tél. '+p.tel:'',e.note].filter(Boolean).join(' — ')});
      if(p)addContact({role:'Restaurant',presId:p.id,note:e.note||''})}
    else if(e.t==='libre')lg.push({id:uid(),type:'libre',nature:LT.libre[1],lieu:e.note||'Temps libre',duree:String(num(e.duree)||'')});
    else lg.push({id:uid(),type:'arret',nature:LT.arret[1],lieu:e.note||'Activité',duree:String(num(e.duree)||'')})}));
  lg.push({id:uid(),type:'fin',nature:LT.fin[1],lieu:fin.txt?(fin.nuit?'Retour : ':'Dépose : ')+fin.txt:'',duree:''});
  if(sejNow&&sejNow.presId)addContact({role:'Hébergement',presId:sejNow.presId,note:'Nuit du jour '+(ji+1)});
  Object.assign(t,{titre:(c.titre||'Circuit')+' — jour '+(ji+1)+(j.titre?' : '+j.titre:''),sous:o.ed,date,debut:j.debut||'09:00',circId:c.id,jour:ji+1,ed:o.ed,lignes:lg,contacts:ct});
  t.h.effectif=o.pax?o.pax+' participants':'';t.h.pec=[j.debut,dep].filter(Boolean).join(' · ');t.h.finlieu=fin.txt;
  const nA=Math.max(0,Math.round(num(c.acc)));t.accs=Array.from({length:nA},(_,n)=>({id:uid(),role:n===0?'Guide principal':n===1?'Chauffeur':'Autre accompagnateur',presId:'',nom:n===0?[profil.prenom,profil.nom].filter(Boolean).join(' '):'',tel:n===0?(profil.tel||''):''}));t.h.prestation=(c.titre||'Circuit')+', jour '+(ji+1)+' sur '+c.jours.length;
  return t}

/* ---------- Document du circuit ---------- */
function cirModel(c,L,pres,V=[]){
  const al=circAlerts(c,L),n=cirLieuIds(c).length,vp=verdict('pmr',al,n),vc=verdict('car',al,n),cc=circCalc(c,L);
  const B=[{h1:c.titre||'Circuit'},{meta:['Circuit',c.jours.length+' jour'+(c.jours.length>1?'s':''),num(c.pax)?'effectif de référence : '+num(c.pax):'',c.depart?'départ le '+frDate(c.depart):''].filter(Boolean).join(' · ')}];
  if(c.desc)B.push({p:c.desc});
  B.push({h2:'Contraintes du circuit'},{table:[['Accessible PMR',vp.txt+(vp.who.length?' — '+whoTxt(vp.who):'')],['Accessible en autocar',vc.txt+(vc.who.length?' — '+whoTxt(vc.who):'')]]});
  const rest=al.filter(a=>a.cat!=='pmr'&&a.cat!=='car'&&a.lvl!=='info');
  if(rest.length)B.push({grid:{w:[1800,2400,1600,5000],head:['Niveau','Lieu','Où','Contrainte'],rows:rest.map(a=>[{t:lvlName[a.lvl],b:a.lvl==='bloc',fill:a.lvl==='bloc'?'F8D7D0':'FFF2A8'},a.lieu,a.where,a.txt])}});
  const rows=[];c.jours.forEach((j,ji)=>PARTS.forEach(([k,lab])=>{const A=j.parts[k];if(!A.length)return;A.forEach(e=>{
    const r=e.t==='lieu'?L.get(e.lieuId):null,p=e.presId&&pres.find(x=>x.id===e.presId);
    const what=e.t==='lieu'?(r?lieuNom(r)+(fo?' — '+(fo.nom||'formule'):''):'(lieu introuvable)'):e.t==='repas'?'Repas'+(p?' — '+p.nom+(p.tel?' ('+p.tel+')':''):'')+(e.note?' — '+e.note:''):e.t==='libre'?'Temps libre'+(e.note?' — '+e.note:''):(e.note||'Activité');
    const d=e.t==='lieu'?entDuree(e,r,V):num(e.duree),fo=e.t==='lieu'?entForm(e,entVis(e,V)):null;
    rows.push([{t:'Jour '+(ji+1)+(j.titre?'\n'+j.titre:''),b:1},lab,{t:what,b:e.t==='lieu'},d?mins(d):'—',r?lieuFlags(r,{date:dayDate(c,ji),part:k,pax:c.pax}).filter(f=>f.lvl!=='info').map(f=>f.short).join(' ; '):''])})}));
  B.push({h2:'Prise en charge et fin de journée'},{grid:{w:[1500,1700,4600,4300],head:['Jour','Prise en charge','Lieu de prise en charge','Fin de journée'],rows:c.jours.map((j,ji)=>{const f=cirFin(c,ji,pres);return [{t:'Jour '+(ji+1)+(j.titre?'\n'+j.titre:''),b:1},j.debut||'—',cirDep(c,ji,pres)||'à préciser',f.txt?(f.nuit?'Nuit : ':'Dépose : ')+f.txt:'à préciser']})}});
  if(rows.length)B.push({h2:'Programme'},{grid:{w:[1700,1400,4400,1000,4300],head:['Jour','Partie','Programme','Durée','Contraintes'],rows}});
  if(c.sejours.length)B.push({h2:'Séjours'},{grid:{w:[2200,3200,1200,3000,1500],head:['Séjour','Établissement','Nuits','Coordonnées','Prix / nuit'],rows:c.sejours.map(s=>{const p=pres.find(x=>x.id===s.presId);return [s.type||'',(p&&p.nom)||s.nom||'',String(c.jours.filter(j=>j.sejId===s.id).length),p?[p.adresse,p.tel].filter(Boolean).join('\n'):'',blank(s.pu)?'—':eur(num(s.pu))]})}});
  if(cc.lines.length)B.push({h2:'Budget du circuit (coûts)'},{grid:{w:[5200,3000,1800],head:['Poste','Calcul','Total'],rows:[...cc.lines.map(l=>[l.poste||'',num(l.pu)?eur(num(l.pu))+' × '+String(qty(l)).replace('.',',')+(l.mode==='fixe'?' (forfait)':''):'sans montant',eur(lineCost(l,cc.k.n,cc.k.acc))]),[{t:'Total',b:1},'',{t:eur(cc.k.total),b:1}]]}},{p:'Coût de revient par participant payant : '+eur(cc.k.rev)+(cc.warn.length?'. ATTENTION, budget incomplet : '+[...new Set(cc.warn)].join(' ; ')+'.':'.')});
  B.push({small:'Document établi avec Tiango – tiango.fr'});return B}
/* ================= ANNUAIRE : chauffeurs, autocaristes, restaurants, guides, hébergements… ================= */
NEW.pre=()=>({id:uid(),kind:'pre',updated:Date.now(),nom:'',role:'Restaurant',contact:'',tel:'',tel2:'',mail:'',adresse:'',web:'',note:''});
KINDS.pre={list:'preList',one:'prestataire',ico:'📇',empty:'Annuaire vide',hint:'',add:'＋ Nouveau prestataire',
  title:i=>i.nom||'Prestataire sans nom',sub:i=>[i.role,i.tel].filter(Boolean).join(' · '),pills:i=>[i.contact||'']};
/* chauffeur : volant et silhouette derrière (le minibus se confondait avec l'autocar) */
const ICO_DRV='<svg viewBox="0 0 32 32" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="16" cy="7.5" r="4.2"/><path d="M7 18.5c1.2-3.6 4.4-5.5 9-5.5s7.8 1.9 9 5.5"/><circle cx="16" cy="22.5" r="6.2"/><circle cx="16" cy="22.5" r="1.5"/><path d="M9.8 22.5h4.7M17.5 22.5h4.7M16 24v4.2"/></svg>';
const PRES_ICO={'Chauffeur':ICO_DRV,'Autocariste':'🚌','Société sous-traitante':'🏢','Guide local':'🧭','Guide-conférencier':'🎙️','Restaurant':'🍽️','Hébergement':'🛏️','Site / gestionnaire':'🏛️','Autre':'📇'};
const presIco=p=>PRES_ICO[p.role]||'📇',presIcoS=p=>presIco(p).replace('width="44" height="44"','width="18" height="18" style="vertical-align:-3px"');
const telHref=t=>'tel:'+String(t||'').replace(/[^\d+]/g,'');
let preFilter='',preQ='';
VIEWS.preList={top:1,t:()=>'Tiango '+sub2('Annuaire des prestataires'),async r(){
  const all=(await live('items')).filter(i=>i.kind==='pre').map(fixItem).sort((a,b)=>String(a.role).localeCompare(String(b.role),'fr')||String(a.nom).localeCompare(String(b.nom),'fr'));
  if(view!=='preList')return;
  $('#main').innerHTML=`<div class="row" style="margin-top:14px"><button class="btn acc grow" id="pNew">＋ Nouveau prestataire</button></div>
   <div class="row" style="margin-top:10px"><button class="btn sec grow" id="pImp">📥 Importer des contacts (Excel, IA)</button></div>
   ${all.length>0?`<div class="row" style="margin-top:10px"><select id="pRole" aria-label="Filtrer par rôle"><option value="">Tous les rôles</option>${PRES_ROLES.map(r=>`<option${r===preFilter?' selected':''}>${esc(r)}</option>`).join('')}</select></div><input class="search" id="pQ" type="search" placeholder="Rechercher un nom, une ville, un métier, une note…" aria-label="Rechercher" value="${esc(preQ)}">`:''}
   <div id="pL"></div>`;
  const draw=()=>{const qs=strip(preQ).split(/\s+/).filter(Boolean),L=all.filter(p=>{if(preFilter&&p.role!==preFilter)return false;const h=strip([p.nom,p.contact,p.tel,p.tel2,p.mail,p.web,p.adresse,p.role,p.note].join(' '));return qs.every(w=>h.includes(w))});
    $('#pL').innerHTML=L.length?L.map(p=>`<div class="card rep" data-id="${esc(p.id)}"><div class="th">${presIco(p)}</div><div class="grow"><h3>${esc(p.nom||'Prestataire sans nom')}</h3><div class="mute">${esc([p.contact,p.tel].filter(Boolean).join(' · '))}</div>${p.note?`<div class="mute" style="font-size:13px">${esc(String(p.note).replace(/\s+/g,' ').slice(0,90))}</div>`:''}<span class="pill">${esc(p.role||'Autre')}</span>${/\d{6}/.test(String(p.tel).replace(/\D/g,''))?`<a class="pill" href="tel:${esc(String(p.tel).replace(/[^+\d]/g,''))}">📞 Appeler</a>`:''}</div></div>`).join('')
      :`<div class="empty"><b>${all.length?'Aucun résultat':'Annuaire vide'}</b>${all.length?'':'Notez ici une fois pour toutes vos chauffeurs, autocaristes, restaurants, guides locaux, sous-traitants et hébergements, avec leur téléphone. Vous les choisirez ensuite dans les circuits et les CTI.'}</div>`;
    cards($('#pL'),id=>go('pre',id));$$('#pL a[href^="tel:"]').forEach(a=>a.onclick=e=>e.stopPropagation())};
  draw();
  if($('#pRole'))$('#pRole').onchange=e=>{preFilter=e.target.value;draw()};
  if($('#pQ'))$('#pQ').oninput=e=>{preQ=e.target.value;draw()};
  $('#pImp').onclick=()=>preAiSheet();
  $('#pNew').onclick=async()=>{if(!(await gate('pre')))return;const p=NEW.pre();if(preFilter)p.role=preFilter;await DB.put('items',p);go('pre',p.id)};
}};
VIEWS.pre={item:1,back:'preList',t:()=>esc(item.nom||'Nouveau prestataire')+sub2('Prestataire'),async r(){
  const p=item,all=(await live('items')).map(fixItem);if(item!==p||view!=='pre')return;
  $('#main').innerHTML=`<div class="card"><div class="grid" id="pF">${[['nom','Nom (société, établissement, personne)','text','wide'],['role','Rôle','select',PRES_ROLES],['contact','Contact (nom, fonction)','text'],['tel','Téléphone','tel'],['tel2','Autre téléphone','tel'],['mail','E-mail','email'],['adresse','Adresse','text','wide'],['web','Site internet','url'],['note','Notes (capacité, tarifs, conditions, jours de fermeture…)','textarea']].map(f=>field(f,p,'pr_')).join('')}</div>
    <div class="row" style="margin-top:12px">${p.tel?`<a class="btn sec grow" href="${esc(telHref(p.tel))}">📞 Appeler</a>`:''}</div></div>${delBtn}`;
  bindFields($('#pF'),p,e=>{saveItem();if(e&&e.dataset.k==='nom')$('#ttl').firstChild.textContent=e.value||'Nouveau prestataire'});
  $('#iDel').onclick=()=>{const n=all.filter(i=>(i.kind==='cti'&&i.contacts.some(c=>c.presId===p.id))||(i.kind==='cir'&&(i.sejours.some(s=>s.presId===p.id)||i.jours.some(j=>PARTS.some(([k])=>j.parts[k].some(e=>e.presId===p.id)))))).length;
    confirmBox('Supprimer ce prestataire ?',(n?'Il est utilisé dans '+n+' circuit(s) ou CTI : ils afficheront « prestataire supprimé ».\n\n':'')+'La fiche part à la corbeille. Vous pourrez la restaurer pendant 30 jours depuis le menu.','Mettre à la corbeille',async()=>{p.deleted=Date.now();await saveItem(true);go('preList');toast('Mis à la corbeille')})};
  $('#iDup').onclick=dupItem;
}};

/* ---------- Contacts d'un CTI : annuaire, fiche d'un site, ou saisie libre ---------- */
const CT_ROLES=[...PRES_ROLES,'Site'];
function contactInfo(ct,pres,reps){
  if(ct.presId){const p=pres.find(x=>x.id===ct.presId);return p?{nom:p.nom||'Sans nom',tel:[p.tel,p.tel2].filter(Boolean).join(' / '),mail:p.mail||'',det:p.contact||'',ok:1}:{nom:'(prestataire supprimé)',tel:'',mail:'',det:'',ok:0}}
  if(ct.lieuId){const r=reps.find(x=>x.id===ct.lieuId);return r?{nom:lieuNom(r),tel:r.d.contact_tel||r.d.tel||'',mail:r.d.mail||'',det:r.d.contact||'',ok:1}:{nom:'(lieu introuvable)',tel:'',mail:'',det:'',ok:0}}
  return {nom:ct.nom||'',tel:ct.tel||'',mail:'',det:'',ok:1}}
function drawContacts(c,pres,reps,sibs){
  const b=$('#cCt');if(!b)return;
  const src=ct=>`<option value="">— saisie libre —</option>${pres.length?`<optgroup label="Annuaire">${pres.filter(p=>!ct.role||p.role===ct.role||p.id===ct.presId).map(p=>`<option value="p:${esc(p.id)}"${p.id===ct.presId?' selected':''}>${esc(p.nom||'Sans nom')}</option>`).join('')}</optgroup>`:''}${ct.role==='Site'||ct.lieuId?`<optgroup label="Sites">${reps.map(r=>`<option value="l:${esc(r.id)}"${r.id===ct.lieuId?' selected':''}>${esc(lieuNom(r))}</option>`).join('')}</optgroup>`:''}`;
  b.innerHTML=`<p class="mute" style="margin:12px 0 0">Chauffeur, autocariste, guide local, restaurant, site à visiter, hébergement : choisissez dans l'annuaire (menu ☰) ou saisissez à la main. Le numéro suit la fiche : corrigé dans l'annuaire, il l'est partout.</p>`
   +c.contacts.map((ct,i)=>{const I=contactInfo(ct,pres,reps),free=!ct.presId&&!ct.lieuId;
     return `<div class="pt" data-i="${i}"><div class="hd"><select data-cf="role" aria-label="Rôle" class="ty">${CT_ROLES.map(r=>`<option${r===ct.role?' selected':''}>${esc(r)}</option>`).join('')}</select><button class="mini" data-ca="up" aria-label="Monter"${i?'':' disabled'}>↑</button><button class="mini" data-ca="dn" aria-label="Descendre"${i<c.contacts.length-1?'':' disabled'}>↓</button><button class="mini" data-ca="rm" aria-label="Supprimer">🗑</button></div>
      <div class="f"><label>Fiche</label><select data-cf="src">${src(ct)}</select></div>
      ${free?`<div class="grid"><div class="f"><label>Nom</label><input data-cf="nom" value="${esc(ct.nom||'')}"></div><div class="f"><label>Téléphone</label><input data-cf="tel" type="tel" value="${esc(ct.tel||'')}"></div></div>`
        :`<div class="box${I.ok?'':' warn'}" style="margin-top:8px"><b>${esc(I.nom)}</b>${I.det?'<br>'+esc(I.det):''}${I.tel?`<br>📞 <a href="${esc(telHref(I.tel))}">${esc(I.tel)}</a>`:I.ok?'<br><span class="mute">Pas de numéro renseigné</span>':''}${I.mail?'<br>'+esc(I.mail):''}</div>`}
      <div class="f"><label>Remarque (jour, heure de rendez-vous, plaque, mission)</label><input data-cf="note" value="${esc(ct.note||'')}"></div></div>`}).join('')
   +`<div class="row" style="margin-top:12px"><button class="btn sec grow" data-ca="add">＋ Ajouter un contact</button>${pres.length?'':'<button class="btn sec grow" data-ca="ann">📇 Ouvrir l\'annuaire</button>'}</div>
     ${sibs.length?`<div class="row" style="margin-top:8px"><select id="cCopy" aria-label="Reprendre les contacts d'un autre CTI"><option value="">Reprendre les contacts de…</option>${sibs.map(s=>`<option value="${esc(s.id)}">${esc(s.titre||'CTI')}</option>`).join('')}</select></div>`:''}`;
  setCnt('c_ct',String(c.contacts.length));
  const redraw=()=>drawContacts(c,pres,reps,sibs);
  $$('[data-cf]',b).forEach(e=>{const i=+e.closest('.pt').dataset.i,ct=c.contacts[i],f=e.dataset.cf;
    if(e.tagName==='SELECT')e.onchange=()=>{if(f==='src'){ct.presId='';ct.lieuId='';if(e.value.startsWith('p:')){ct.presId=e.value.slice(2);const p=pres.find(x=>x.id===ct.presId);if(p&&PRES_ROLES.includes(p.role))ct.role=p.role}else if(e.value.startsWith('l:')){ct.lieuId=e.value.slice(2);ct.role='Site'}}else ct[f]=e.value;saveItem(true);redraw()};
    else e.oninput=()=>{ct[f]=e.value;saveItem()}});
  $$('[data-ca]',b).forEach(e=>e.onclick=()=>{const a=e.dataset.ca,i=e.closest('.pt')?+e.closest('.pt').dataset.i:-1;
    if(a==='add'){c.contacts.push({id:uid(),role:'Chauffeur',presId:'',lieuId:'',nom:'',tel:'',note:''});saveItem(true);redraw();return}
    if(a==='ann')return go('preList');
    if(a==='up'&&i>0)c.contacts.splice(i-1,0,c.contacts.splice(i,1)[0]);
    if(a==='dn')c.contacts.splice(i+1,0,c.contacts.splice(i,1)[0]);
    if(a==='rm')return confirmBox('Retirer ce contact du CTI ?',contactInfo(c.contacts[i],pres,reps).nom||'Contact','Retirer',()=>{c.contacts.splice(i,1);saveItem(true);redraw()});
    saveItem(true);redraw()});
  if($('#cCopy'))$('#cCopy').onchange=e=>{const s=sibs.find(x=>x.id===e.target.value);if(!s)return;let n=0;
    for(const ct of s.contacts){if(c.contacts.some(x=>(ct.presId&&x.presId===ct.presId)||(ct.lieuId&&x.lieuId===ct.lieuId)))continue;c.contacts.push({...ct,id:uid()});n++}
    saveItem(true);redraw();toast(n?n+' contact(s) repris':'Ces contacts sont déjà dans ce CTI')};
}
/* contraintes des sites d'un CTI : contrôle des jours de fermeture et des horaires d'après le déroulé calculé */
function ctiFlags(c,reps){const out=[];let t=t2m(c.debut);const pax=parseInt(String(c.h.effectif||'').match(/\d+/)||0,10)||0;
  c.lignes.forEach((l,i)=>{const s=t,e=t+num(l.duree);t=e;if(l.type!=='arret'||!l.repId)return;const r=reps.find(x=>x.id===l.repId);if(!r)return;
    lieuFlags(r,{date:c.date,pax}).filter(f=>f.lvl!=='info'&&f.cat!=='car'||f.cat==='car'&&f.lvl!=='info').forEach(f=>out.push({...f,lieu:l.lieu||lieuNom(r)}));
    const o=r.d.h_ouv?t2m(r.d.h_ouv):null,f2=r.d.h_fer?t2m(r.d.h_fer):null;
    if(o!==null&&s<o)out.push({lvl:'att',cat:'hor',ico:'🕘',short:'Avant l\'ouverture',txt:'Arrivée à '+hm(s)+', le site ouvre à '+hm(o),lieu:l.lieu||lieuNom(r)});
    if(f2!==null&&num(l.duree)&&e>f2)out.push({lvl:'att',cat:'hor',ico:'🕘',short:'Après la fermeture',txt:'Fin à '+hm(e)+', le site ferme à '+hm(f2),lieu:l.lieu||lieuNom(r)})});
  return out.sort((a,b)=>LVL[a.lvl]-LVL[b.lvl])}

/* ---------- Import de contacts en nombre : format Tiango, préparé par une IA à partir d'un fichier Excel ---------- */
const FMT_PRE=`{
 "format": "tiango-annuaire", "version": 1,
 "prestataires": [{
   "nom": "société, établissement ou personne",
   "role": "Chauffeur | Autocariste | Société sous-traitante | Guide local | Guide-conférencier | Restaurant | Hébergement | Site / gestionnaire | Autre",
   "contact": "nom et fonction de l'interlocuteur", "tel": "", "tel2": "", "mail": "", "adresse": "", "web": "",
   "note": "métier précis, zone géographique, langues, capacité, tarif, remarques : tout ce qui permettra de retrouver ce contact par une recherche"
 }]
}`;
const prePrompt=()=>`Tu m'aides à transformer un fichier de contacts (Excel ou CSV, joint à ce message ou collé ci-dessous) en annuaire de prestataires pour l'application Tiango, utilisée par des guides touristiques.

CE QUI EST ATTENDU
- Une entrée par contact, sans en oublier ni en fusionner.
- "role" : choisis dans la liste proposée (un hôtel, un camping ou un gîte est « Hébergement » ; un guide accompagnateur ou local est « Guide local » ; un guide conférencier est « Guide-conférencier »). Si aucun ne convient : « Autre ».
- "note" : mets-y tout ce qui n'a pas de champ à lui (spécialité, ville ou région couverte, langues, capacité, tarif, jours de fermeture, remarques). La recherche de l'application porte sur ce champ : écris-le avec des mots simples et précis (ex. « guide accompagnatrice, région de Saint-Malo, anglais, 350 € la journée »).
- Les numéros de téléphone au format national lisible (06 12 34 56 78).

RÈGLES
- N'invente rien : laisse vide ce que le fichier ne contient pas.
- Réponds uniquement par un objet JSON valide, sans texte avant ni après, qui respecte exactement cette structure (les valeurs séparées par « | » sont des choix) :

${FMT_PRE}`;
function preAiSheet(){
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Importer des contacts"><div class="sheet"><h2>Importer des contacts</h2>
   <p class="mute">1. Copiez la consigne. 2. Donnez-la à Claude ou à l'IA de votre choix avec votre fichier Excel (joint ou collé). 3. Rapportez sa réponse ici avec « Importer ».</p>
   <div class="f"><label for="prP">Consigne à transmettre à l'IA</label><textarea class="code" id="prP" readonly></textarea></div>
   <div class="row" style="margin-top:12px"><button class="btn acc grow" id="prCp">Copier la consigne</button><button class="btn sec grow" id="prImp">📥 Importer la réponse</button></div>
   <div class="row" style="margin-top:10px"><button class="btn sec grow" id="mNo">Fermer</button></div></div></div>`;
  $('#prP').value=prePrompt();$('#mNo').onclick=closeModal;$('#prImp').onclick=()=>importSheet();
  $('#prCp').onclick=async()=>{try{await navigator.clipboard.writeText($('#prP').value)}catch(e){$('#prP').select();document.execCommand('copy')}toast('Consigne copiée : collez-la dans l\'IA')}}
async function preImport(j){
  const A_=Array.isArray(j.prestataires)?j.prestataires:[];if(!A_.length)throw new Error('aucun prestataire dans ce fichier');
  const nm=t=>strip(t).replace(/[^a-z0-9]+/g,' ').trim(),dg=t=>String(t||'').replace(/\D/g,''),S_=v=>v==null?'':String(v).trim();
  const have=(await live('items')).filter(i=>i.kind==='pre').map(fixItem),seen=new Set(have.map(p=>nm(p.nom)+'|'+dg(p.tel)));
  const add=[],dup=[];
  for(const x of A_){const o=O(x),nom=S_(o.nom);if(!nom)continue;
    const ro=PRES_ROLES.find(r=>nm(r)===nm(o.role))||(/h[oô]tel|camping|g[iî]te|h[ée]bergement/i.test(S_(o.role))?'Hébergement':'Autre');
    const p={...NEW.pre(),nom,role:ro,contact:S_(o.contact),tel:S_(o.tel),tel2:S_(o.tel2),mail:S_(o.mail),adresse:S_(o.adresse),web:S_(o.web),note:S_(o.note)},k=nm(nom)+'|'+dg(p.tel);
    if(seen.has(k))dup.push(nom);else{seen.add(k);add.push(p)}}
  if(!add.length)throw new Error('tous ces contacts sont déjà dans l\'annuaire ('+dup.length+')');
  if(!(await gate('pre',add.length)))return;
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Importer les contacts"><div class="sheet"><h2>Importer ${add.length} contact${add.length>1?'s':''} ?</h2>
   <p class="mute">${dup.length?dup.length+' déjà présent'+(dup.length>1?'s':'')+' (même nom et même téléphone) : ignoré'+(dup.length>1?'s':'')+'. ':''}Aperçu :</p>
   <div style="max-height:40vh;overflow:auto">${add.slice(0,40).map(p=>`<div class="doc"><span>${presIcoS(p)} <b>${esc(p.nom)}</b> · ${esc(p.role)}${p.tel?' · '+esc(p.tel):''}</span></div>`).join('')}${add.length>40?'<p class="mute">… et '+(add.length-40)+' autres.</p>':''}</div>
   <div class="row" style="margin-top:14px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn acc grow" id="pvOk">Importer</button></div></div></div>`;
  $('#mNo').onclick=closeModal;
  $('#pvOk').onclick=async()=>{try{await txm(['items'],S=>add.forEach(p=>S('items').put(p)));closeModal();toast(add.length+' contact'+(add.length>1?'s':'')+' importé'+(add.length>1?'s':''),4500);modTouch();go('preList')}catch(e){toast('Import impossible : '+e.message,6000)}}}
/* ================= REPÉRAGES : sorties de terrain datées, sur un site ou sur un circuit entier ================= */
NEW.rpg=()=>({id:uid(),kind:'rpg',updated:Date.now(),titre:'',date:today(),cible:'lieu',circId:'',blocs:[],note:'',applied:{}});
KINDS.rpg={list:'rpgList',one:'repérage',ico:'🧭',title:i=>i.titre||'Repérage sans titre',sub:i=>frDate(i.date),pills:i=>[i.blocs.length+' lieu'+(i.blocs.length>1?'x':'')]};
const FLAB={};SCHEMA.forEach(s=>s.f.forEach(([k,l])=>FLAB[k]=l));
const blocNew=r=>({id:uid(),lieuId:r.id,d:{},pts:{},note:'',gps:null});
const nConst=b=>Object.values(b.d).filter(v=>!blank(v)).length+Object.values(b.pts).filter(p=>p&&(!blank(p.duree)||!blank(p.note))).length+(b.note?1:0)+(b.gps?1:0);

VIEWS.rpgList={top:1,t:()=>'Tiango '+sub2('Repérages sur le terrain'),async r(){
  const all=(await live('items')).filter(i=>i.kind==='rpg').map(fixItem).sort((a,b)=>String(b.date).localeCompare(String(a.date))||b.updated-a.updated),
    old=(await live('reps')).map(fixRep).filter(r=>r.ctiId).sort((a,b)=>b.updated-a.updated),L=new Map((await live('reps')).map(r=>[r.id,r]));
  if(view!=='rpgList')return;
  $('#main').innerHTML=`<div class="row" style="margin-top:14px"><button class="btn acc grow" id="rNew">＋ Nouveau repérage</button></div>
   <p class="mute">Un repérage est une sortie datée. Il porte sur un site ou sur un circuit entier ; à la fin, vous choisissez ce qui met à jour la fiche des sites.</p>
   ${all.length?all.map(i=>`<div class="card rep" data-id="${esc(i.id)}"><div class="th">🧭</div><div class="grow"><h3>${esc(i.titre||'Repérage sans titre')}</h3><div class="mute">${esc(frDate(i.date))}${i.blocs.length?' · '+esc(i.blocs.slice(0,3).map(b=>lieuNom(L.get(b.lieuId))).join(', ')+(i.blocs.length>3?'…':'')):''}</div>
      <span class="pill">${i.circId?'Circuit':'Lieu'}</span>${i.applied&&i.applied.t?'<span class="pill">sites mis à jour</span>':''}</div></div>`).join(''):'<div class="empty"><b>Aucun repérage</b>Préparez une sortie : choisissez un site déjà établi, ou un circuit complet.</div>'}
   ${old.length?`<h3 style="margin:22px 0 4px;font-size:15px">Repérages d'itinéraire créés depuis un CTI</h3><p class="mute" style="margin:0 0 6px">Ils restent disponibles tels quels, avec leur report dans le CTI.</p>${old.map(r=>`<div class="card rep" data-old="${esc(r.id)}" data-id="${esc(r.id)}"><div class="th">🗺️</div><div class="grow"><h3>${esc(lieuNom(r))}</h3><div class="mute">${esc(frDate(r.d.date))}</div></div></div>`).join('')}`:''}`;
  $$('.rep').forEach(e=>{e.setAttribute('role','button');e.tabIndex=0;const f=()=>e.dataset.old?openLieu(e.dataset.id,'rpgList'):go('rpg',e.dataset.id);e.onclick=f;e.onkeydown=k=>{if(k.key==='Enter'||k.key===' '){k.preventDefault();f()}}});
  $('#rNew').onclick=()=>newRpg();
}};

/* création : sur un site existant, un nouveau site, ou un circuit */
async function newRpg(o={}){
  await flushAll();
  const reps=(await live('reps')).map(fixRep).filter(r=>!r.ctiId).sort((a,b)=>lieuNom(a).localeCompare(lieuNom(b),'fr')),circs=(await live('items')).filter(i=>i.kind==='cir').map(fixItem);
  const make=async(r0)=>{if(!(await gate('rpg')))return;const x=NEW.rpg();
    if(r0.circId){const c=circs.find(k=>k.id===r0.circId);if(!c)return toast('Circuit introuvable');const ids=cirLieuIds(c).filter(id=>reps.some(r=>r.id===id));
      if(!ids.length)return toast('Ce circuit ne contient encore aucun lieu à repérer');x.circId=c.id;x.cible='circuit';x.titre='Repérage du circuit — '+(c.titre||'sans titre');x.blocs=ids.map(id=>blocNew(reps.find(r=>r.id===id)))}
    else{const r=reps.find(k=>k.id===r0.lieuId);if(!r)return toast('Site introuvable');x.titre='Repérage — '+lieuNom(r);x.blocs=[blocNew(r)]}
    await DB.put('items',x);closeModal();go('rpg',x.id)};
  if(o.lieuId||o.circId)return make(o);
  const d={mode:'lieu',lieuId:'',circId:'',nom:''};
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Nouveau repérage"><div class="sheet"><h2>Nouveau repérage</h2>
   <div class="f"><label>Que repérez-vous ?</label><div class="seg" id="rM"><button type="button" data-m="lieu" class="on">Un site</button><button type="button" data-m="circuit">Un circuit entier</button></div></div>
   <div id="rLieu"><div class="f"><label for="rL">Site déjà établi</label><select id="rL"><option value="">— choisir —</option>${reps.map(r=>`<option value="${esc(r.id)}">${esc(lieuNom(r))}${r.d.ville?' ('+esc(r.d.ville)+')':''}</option>`).join('')}<option value="__new">＋ Nouveau site…</option></select></div>
     <div class="f" id="rNomB" hidden><label for="rNom">Nom du nouveau site</label><input id="rNom"></div></div>
   <div id="rCirc" hidden><div class="f"><label for="rC">Circuit</label><select id="rC"><option value="">— choisir —</option>${circs.map(c=>`<option value="${esc(c.id)}">${esc(c.titre||'Circuit sans titre')}</option>`).join('')}</select></div></div>
   <div class="row" style="margin-top:14px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn grow" id="mOk">Créer le repérage</button></div></div></div>`;
  $$('#rM button').forEach(b=>b.onclick=()=>{d.mode=b.dataset.m;$$('#rM button').forEach(x=>x.classList.toggle('on',x===b));$('#rLieu').hidden=d.mode!=='lieu';$('#rCirc').hidden=d.mode!=='circuit'});
  $('#rL').onchange=e=>{$('#rNomB').hidden=e.target.value!=='__new'};$('#mNo').onclick=closeModal;
  $('#mOk').onclick=async()=>{
    if(d.mode==='circuit'){const v=$('#rC').value;if(!v)return toast('Choisissez un circuit');return make({circId:v})}
    const v=$('#rL').value;if(!v)return toast('Choisissez un site, ou créez-en un');
    if(v==='__new'){const nm=$('#rNom').value.trim();if(!nm)return toast('Donnez un nom au nouveau site');if(!(await gate('reps')))return;
      const r={id:uid(),created:Date.now(),updated:Date.now(),d:{site:nm,date:'',pays:'France'},gps:null,points:[],bud:[],np:0,nd:0,cover:''};await DB.put('reps',r);reps.push(r);return make({lieuId:r.id})}
    make({lieuId:v})}}

VIEWS.rpg={item:1,get back(){return item&&item.circId?['cir',item.circId]:'rpgList'},t:()=>esc(item.titre||'Repérage')+sub2('Repérage sur le terrain'),async r(){
  const x=item,reps=(await live('reps')).map(fixRep),L=new Map(reps.map(r=>[r.id,r]));
  const ph=new Map();for(const b of x.blocs)if(L.has(b.lieuId))ph.set(b.id,(await DB.filesOf(b.lieuId)).filter(f=>f.kind==='photo'&&f.rpgId===x.id).sort((a,b)=>a.t-b.t));
  if(item!==x||view!=='rpg')return;
  if(!OPEN.has('r_init')){OPEN.add('r_init');if(x.blocs[0])OPEN.add('r_'+x.blocs[0].id)}
  $('#main').innerHTML=`<div class="card"><div class="grid" id="rId">${[['titre','Intitulé','text','wide'],['date','Date de la sortie','date'],['note','Observations générales (météo, affluence, conditions)','textarea']].map(f=>field(f,x,'rp_')).join('')}</div>
    <div class="row" style="margin-top:12px"><button class="btn acc grow" id="rApply">✔ Terminer : mettre à jour les sites</button></div>
    <div class="row" style="margin-top:10px"><button class="btn sec grow" id="rPv">📄 Compte rendu (Word, PDF)</button></div>
    ${x.applied&&x.applied.t?`<div class="box">Sites mis à jour le ${new Date(x.applied.t).toLocaleDateString('fr-FR')} (${+x.applied.n||0} changement${x.applied.n>1?'s':''}). Vous pouvez compléter ce repérage et recommencer : seuls les écarts restants seront proposés.</div>`:''}</div>
   ${x.blocs.map((b,bi)=>{const r=L.get(b.lieuId);
     if(!r)return `<div class="box warn"><b>Un site de ce repérage est introuvable</b> (supprimé ?). Restaurez-le depuis la corbeille : ses constats sont conservés ici.</div>`;
     const body=`<div class="row" style="margin-top:12px;flex-wrap:wrap"><button class="btn sm" data-ph="${esc(b.id)}">📷 Photo</button><button class="btn sec sm" data-gps="${esc(b.id)}">📌 Position</button><button class="btn sec sm" data-fiche="${esc(b.lieuId)}">Ouvrir la fiche</button></div>
       <div class="mute" id="gp_${esc(b.id)}" style="margin-top:6px">${b.gps?'📌 '+gpsTxt(b.gps):'Position non relevée'}</div><div id="ph_${esc(b.id)}"></div>
       ${r.points.length?`<h3 style="margin:14px 0 0;font-size:15px">Étapes du site</h3>`+r.points.map((p,pi)=>{const o=b.pts[p.id]||{};return `<div class="pt" data-b="${esc(b.id)}" data-pt="${esc(p.id)}"><b>${pi+1}. ${esc(p.nom||'Étape sans nom')}</b>${num(p.duree)?` <span class="mute">prévu : ${num(p.duree)} min</span>`:''}${p.note?`<div class="mute" style="white-space:pre-wrap">${esc(p.note)}</div>`:''}
          <div class="grid"><div class="f"><label>Durée relevée (min)</label><input data-pf="duree" type="number" inputmode="numeric" min="0" value="${esc(o.duree||'')}"></div><div class="f wide"><label>Constat</label><textarea data-pf="note">${esc(o.note||'')}</textarea></div></div></div>`}).join(''):''}
       <h3 style="margin:14px 0 0;font-size:15px">Constats sur la fiche</h3><p class="mute" style="margin:4px 0 0">Remplissez seulement ce que vous avez vérifié. La valeur actuelle de la fiche est rappelée sous chaque question.</p>
       ${SCHEMA.filter(s=>s.k!=='not').map(s=>`<details class="sec" data-sb="${esc(b.id+s.k)}"><summary><span class="ico">${s.ico}</span>${esc(s.t)}<span class="cnt" data-sc="${esc(b.id+s.k)}"></span></summary><div class="body"><div class="grid" data-bd="${esc(b.id)}" data-sec="${s.k}">${s.f.map(f=>field(f,b.d,'rb'+bi+'_',r.d)).join('')}</div></div></details>`).join('')}
       <div class="f"><label>Note sur ce site</label><textarea data-bnote="${esc(b.id)}">${esc(b.note||'')}</textarea></div>`;
     return sec('r_'+b.id,'📍',lieuNom(r)+(r.d.ville?' ('+r.d.ville+')':''),body,nConst(b)?String(nConst(b)):'')}).join('')}${delBtn}`;
  bindSecs();$('#iDup').remove();
  bindFields($('#rId'),x,e=>{saveItem();if(e&&e.dataset.k==='titre')$('#ttl').firstChild.textContent=e.value||'Repérage'});
  const cnt=b=>{setCnt('r_'+b.id,nConst(b)?String(nConst(b)):'');SCHEMA.forEach(s=>{const e=$(`[data-sc="${CSS.escape(b.id+s.k)}"]`);if(e){const n=s.f.filter(([k])=>!blank(b.d[k])||!blank(b.d[k+'_d'])).length;e.textContent=n?n+' constat'+(n>1?'s':''):'';e.classList.toggle('full',n>0)}})};
  const drawPh=b=>{const e=$('#ph_'+CSS.escape(b.id)),F=ph.get(b.id)||[];if(!e)return;e.innerHTML=F.length?`<div class="ph">${F.map(f=>`<figure data-f="${esc(f.id)}" role="button" tabindex="0"><img src="${urlOf(f)}" alt="${esc(f.cap||'Photo')}"></figure>`).join('')}</div>`:'';
    $$('figure',e).forEach(g=>{const f=F.find(k=>k.id===g.dataset.f);g.onclick=()=>viewRpgPhoto(f,b,()=>{ph.set(b.id,F.filter(k=>k!==f));drawPh(b)});g.onkeydown=k=>{if(k.key==='Enter')g.onclick()}})};
  x.blocs.forEach(b=>{if(!L.has(b.lieuId))return;drawPh(b);cnt(b);
    $$(`[data-bd="${CSS.escape(b.id)}"]`).forEach(g=>bindFields(g,b.d,()=>{saveItem();cnt(b)}));
    $$(`[data-b="${CSS.escape(b.id)}"][data-pt]`).forEach(el=>$$('[data-pf]',el).forEach(i=>i.oninput=()=>{const o=b.pts[el.dataset.pt]=obj(b.pts[el.dataset.pt]);o[i.dataset.pf]=i.value;saveItem();cnt(b)}));
    const nt=$(`[data-bnote="${CSS.escape(b.id)}"]`);nt.oninput=()=>{b.note=nt.value;saveItem();cnt(b)};
    $(`[data-gps="${CSS.escape(b.id)}"]`).onclick=async e=>{e.target.textContent='Recherche…';try{b.gps=await getGPS();await saveItem(true);toast('Position enregistrée')}catch(z){toast(z.message,4000)}e.target.textContent='📌 Position';const g=$('#gp_'+CSS.escape(b.id));if(g)g.textContent=b.gps?'📌 '+gpsTxt(b.gps):'Position non relevée';cnt(b)};
    $(`[data-fiche="${CSS.escape(b.lieuId)}"]`).onclick=()=>openLieu(b.lieuId,['rpg',x.id]);
    $(`[data-ph="${CSS.escape(b.id)}"]`).onclick=()=>rpgPhotoAsk(x,b,L.get(b.lieuId),async f=>{(ph.get(b.id)||ph.set(b.id,[]).get(b.id)).push(f);drawPh(b)})});
  $('#iDel').onclick=()=>delItem('ce repérage');
  $('#rPv').onclick=()=>preview({title:x.titre||'Repérage',name:'Reperage_'+slug(x.titre)+(x.date?'_'+x.date:''),blocks:rpgModel(x,L),back:'rpg'});
  $('#rApply').onclick=()=>rpgApply(x,L);
}};
/* ----- photos d'un repérage : rangées dans la fiche du site, avec la date de la sortie ----- */
function rpgPhotoAsk(x,b,r,done){
  const opts=[['','Vues générales du site'],...r.points.map((p,i)=>[p.id,`${i+1}. ${p.nom||'Étape sans nom'}`])];
  $('#modal').innerHTML=`<div class="modal"><div class="sheet"><h2>Ajouter une photo</h2><p class="mute">La photo est rangée dans la fiche de « ${esc(lieuNom(r))} ».</p>
   <div class="f"><label for="rpP">Ranger dans</label><select id="rpP">${opts.map(([v,l])=>`<option value="${esc(v)}">${esc(l)}</option>`).join('')}</select></div>
   <div class="row" style="margin-top:14px"><button class="btn acc grow" id="mCam">📷 Prendre une photo</button><button class="btn sec grow" id="mLib">🖼 Photothèque</button></div>
   <div class="row" style="margin-top:10px"><button class="btn sec grow" id="mNo">Fermer</button></div></div></div>`;
  $('#mNo').onclick=closeModal;
  const pick=lib=>{const pid=$('#rpP').value;closeModal();$$('input.tmpfile').forEach(i=>i.remove());
    const i=document.createElement('input');i.type='file';i.accept='image/*';i.className='tmpfile';i.hidden=true;if(!lib)i.setAttribute('capture','environment');else i.multiple=true;document.body.append(i);
    i.onchange=async()=>{const list=[...i.files];i.remove();if(!list.length)return;toast('Enregistrement de la photo…',8000);
      const gp=lib?Promise.resolve(null):getGPS(7000).catch(()=>null);let n=0;
      for(const file of list){try{const {blob,w,h}=await shrink(file);
        const f={id:uid(),repId:r.id,rpgId:x.id,kind:'photo',pointId:pid,name:String(file.name||'photo'),type:'image/jpeg',blob,w,h,cap:'',t:(lib&&file.lastModified)||Date.now()+n,lib:!!lib,gps:null};
        await DB.put('files',f);n++;gp.then(g=>{if(g){f.gps=g;DB.put('files',f).catch(()=>{})}});if(view==='rpg'&&item===x)await done(f)}catch(e){toast('Photo non enregistrée : '+((e&&e.message)||'espace insuffisant ?'),5000)}}
      if(n){const rr=await DB.get('reps',r.id);if(rr){delete rr.np;await DB.put('reps',rr)}toast(n>1?n+' photos ajoutées':'Photo ajoutée')}};
    i.click()};
  $('#mCam').onclick=()=>pick(false);$('#mLib').onclick=()=>pick(true);
}
function viewRpgPhoto(f,b,gone){
  $('#modal').innerHTML=`<div class="modal"><div class="sheet"><img class="big" src="${urlOf(f)}" alt=""><p class="mute" style="margin:8px 0 0">${f.lib?'Image importée':'Prise'} le ${new Date(f.t).toLocaleString('fr-FR',{dateStyle:'short',timeStyle:'short'})}${f.gps?' · 📌 '+gpsTxt(f.gps):''}</p>
   <div class="f"><label for="pCap">Légende</label><input id="pCap" value="${esc(f.cap||'')}" placeholder="Ce que montre la photo"></div>
   <div class="row" style="margin-top:14px"><button class="btn danger" id="pDel">Supprimer</button><button class="btn grow" id="pOk">Terminé</button></div></div></div>`;
  $('#pOk').onclick=async()=>{f.cap=$('#pCap').value.trim();await DB.put('files',f);closeModal()};
  $('#pDel').onclick=()=>confirmBox('Supprimer cette photo ?','Cette suppression est définitive.','Supprimer',async()=>{await DB.del('files',f.id);const rr=await DB.get('reps',f.repId);if(rr){delete rr.np;await DB.put('reps',rr)}gone()});
}
/* ----- fin de repérage : l'utilisateur choisit ce qui met à jour la fiche du site ----- */
function rpgDiffs(x,L){const D=[];
  for(const b of x.blocs){const r=L.get(b.lieuId);if(!r)continue;
    SCHEMA.forEach(s=>s.f.forEach(([k,l,t])=>{for(const key of t==='yn'?[k,k+'_d']:[k]){const nv=b.d[key];if(blank(nv)||String(r.d[key]??'')===String(nv))continue;
      D.push({b,r,type:'d',key,label:FLAB[k]+(key!==k?' — précisions':''),old:r.d[key],nv:String(nv)})}}));
    r.points.forEach(p=>{const o=obj(b.pts[p.id]);
      if(!blank(o.duree)&&num(o.duree)!==num(p.duree))D.push({b,r,p,type:'pdur',label:'Durée de l\'étape « '+(p.nom||'sans nom')+' »',old:num(p.duree)?num(p.duree)+' min':'',nv:num(o.duree)+' min',val:String(num(o.duree))});
      const tx=String(o.note||'').trim();if(tx&&!String(p.note||'').includes(tx))D.push({b,r,p,type:'pnote',label:'Observation sur l\'étape « '+(p.nom||'sans nom')+' »',old:'',nv:tx})});
    if(b.gps&&(!r.gps||Math.abs(r.gps.lat-b.gps.lat)+Math.abs(r.gps.lon-b.gps.lon)>1e-5))D.push({b,r,type:'gps',label:'Position GPS du site',old:r.gps?gpsTxt(r.gps):'',nv:gpsTxt(b.gps)});
    const nt=String(b.note||'').trim();if(nt&&!String(r.d.notes||'').includes(nt))D.push({b,r,type:'note',label:'Note personnelle',old:'',nv:nt})}
  return D}
function rpgApply(x,L){
  const D=rpgDiffs(x,L);
  if(!D.length)return toast('Rien à reporter : la fiche des sites contient déjà vos constats');
  const sites=[...new Set(D.map(d=>d.r.id))];
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Mettre à jour les sites"><div class="sheet"><h2>Mettre à jour les sites</h2><p class="mute">Cochez ce que vous retenez. Ce qui reste décoché n'est pas perdu : cela reste dans ce repérage.</p>
   ${sites.map(id=>{const r=L.get(id);return `<h3 style="margin:12px 0 4px;font-size:15px">${esc(lieuNom(r))}</h3>`+D.map((d,i)=>[d,i]).filter(([d])=>d.r.id===id).map(([d,i])=>`<div class="chk" style="align-items:flex-start"><input type="checkbox" id="ra${i}" checked><label for="ra${i}" class="grow"><b>${esc(d.label)}</b><br>${d.old?`<span class="mute">avant : ${esc(d.old)}</span><br>`:''}<span>${esc(d.nv)}</span></label></div>`).join('')}).join('')}
   <div class="row" style="margin-top:14px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn grow" id="mOk">Mettre à jour</button></div></div></div>`;
  $('#mNo').onclick=closeModal;
  $('#mOk').onclick=async()=>{const take=D.filter((d,i)=>$('#ra'+i).checked);if(!take.length)return closeModal();closeModal();
    try{const out=[];
      for(const id of sites){const r=fixRep(await DB.get('reps',id));if(!r||r.deleted)continue;const T=take.filter(d=>d.r.id===id);if(!T.length)continue;
        for(const d of T){
          if(d.type==='d')r.d[d.key]=d.nv;
          if(d.type==='pdur'){const p=r.points.find(q=>q.id===d.p.id);if(p)p.duree=d.val}
          if(d.type==='pnote'){const p=r.points.find(q=>q.id===d.p.id);if(p)p.note=[p.note,'Constat du '+frDate(x.date)+' : '+d.nv].filter(Boolean).join('\n')}
          if(d.type==='gps')r.gps=gpsOK(d.b.gps);
          if(d.type==='note')r.d.notes=[r.d.notes,'Repérage du '+frDate(x.date)+' : '+d.nv].filter(Boolean).join('\n')}
        r.d.date=x.date;r.updated=Date.now();out.push(r)}
      await txm(['reps'],S=>out.forEach(r=>S('reps').put(r)));
      x.applied={t:Date.now(),n:take.length};await saveItem(true);toast(take.length+' changement'+(take.length>1?'s':'')+' reporté'+(take.length>1?'s':'')+' dans '+out.length+' lieu'+(out.length>1?'x':''),5000);VIEWS.rpg.r()}
    catch(e){toast('Mise à jour impossible, rien n\'a été modifié : '+((e&&e.message)||'espace insuffisant ?'),7000)}}
}
function rpgModel(x,L){
  const B=[{h1:x.titre||'Repérage'},{meta:['Repérage du '+frDate(x.date),x.blocs.length+' lieu'+(x.blocs.length>1?'x':''),[profil.prenom,profil.nom].filter(Boolean).join(' ')].filter(Boolean).join(' · ')}];
  if(x.note)B.push({p:x.note});
  for(const b of x.blocs){const r=L.get(b.lieuId);B.push({h2:r?lieuNom(r):'(lieu introuvable)'});if(!r)continue;
    const rows=[];SCHEMA.forEach(s=>s.f.forEach(([k,l,t])=>{for(const key of t==='yn'?[k,k+'_d']:[k]){if(blank(b.d[key]))continue;rows.push([l+(key!==k?' — précisions':''),String(b.d[key])+(String(r.d[key]??'')&&String(r.d[key])!==String(b.d[key])?'\n(fiche avant : '+r.d[key]+')':'')])}}));
    if(rows.length)B.push({table:rows});
    const P=r.points.map(p=>{const o=obj(b.pts[p.id]);return [p.nom||'Étape',num(p.duree)?num(p.duree)+' min':'—',blank(o.duree)?'—':num(o.duree)+' min',o.note||'']}).filter(p=>p[2]!=='—'||p[3]);
    if(P.length)B.push({grid:{w:[3000,1400,1400,5200],head:['Étape','Prévu','Relevé','Constat'],rows:P}});
    if(b.note)B.push({p:b.note});if(b.gps)B.push({small:'Position relevée : '+gpsTxt(b.gps)})}
  B.push({small:'Document établi avec Tiango – tiango.fr'});return B}
/* ================= LICENCE : clé nominative signée, vérifiée dans l'appareil (aucun serveur) ================= */
const LIC_PUB={kty:'EC',crv:'P-256',x:'wQOD6WqH5u7YF3v-eLQTXoHp2BxYueZizyB8poi_hyM',y:'yaomiXjoEDNGvIBhUz_dcrX6AJVR4xyMmU_6kdRnukY',ext:true};
const LIC_QUOTA={reps:3,cir:1,cti:2,vis:1,bud:1,rpg:1,pre:5};   /* limites du mode démonstration, et de la licence expirée */
const LIC_NOM={reps:'sites à visiter',cir:'circuit',cti:'CTI',vis:'discours',bud:'budget',rpg:'repérage',pre:'prestataires'};
let LIC={state:'demo'};
const unb64u=s=>Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4)),c=>c.charCodeAt(0));
async function licCheck(str){
  const m=/^TIANGO-1\.([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/.exec(String(str||'').trim());if(!m)return {state:'invalide'};
  try{const key=await crypto.subtle.importKey('jwk',LIC_PUB,{name:'ECDSA',namedCurve:'P-256'},false,['verify']);
    if(!(await crypto.subtle.verify({name:'ECDSA',hash:'SHA-256'},key,unb64u(m[2]),unb64u(m[1]))))return {state:'invalide'};
    const p=JSON.parse(new TextDecoder().decode(unb64u(m[1])));
    if(typeof p.n!=='string'||!p.n||!/^\d{4}-\d{2}-\d{2}$/.test(p.e))return {state:'invalide'};
    const days=Math.ceil((new Date(p.e+'T23:59:59')-Date.now())/864e5);
    return {state:days<0?'expiree':'valide',nom:p.n.slice(0,120),exp:p.e,days}}
  catch(e){return {state:'invalide'}}}
async function licInit(){try{const s=await DB.get('kv','licence');LIC=s?await licCheck(s):{state:'demo'};if(LIC.state==='invalide')LIC={state:'demo'}}catch(e){LIC={state:'demo'}}}
/* prénom et nom du profil : imposés par la licence (démonstration : « Licence » / « Démonstration ») */
function profilId(){if(LIC.state==='valide'||LIC.state==='expiree'){const t=String(LIC.nom||'').trim().split(/\s+/);return {prenom:t[0]||'',nom:t.slice(1).join(' ')}}return {prenom:'Licence',nom:'Démonstration'}}
async function profilSync(){const id=profilId();if(profil.prenom!==id.prenom||profil.nom!==id.nom){profil={...profil,...id};try{await DB.put('kv',profil,'profil')}catch(e){}}}
const licLine=()=>LIC.state==='valide'?'Licence Tiango : '+LIC.nom+', valable jusqu\'au '+frDate(LIC.exp):'Version de démonstration de Tiango : tiango.fr';
/* autorise la création d'un élément : licence valide, ou quota de démonstration non atteint */
async function gate(key,need=1){
  if(LIC.state==='valide')return true;
  const n=key==='reps'?(await live('reps')).filter(r=>!r.ctiId).length:(await live('items')).filter(i=>i.kind===key).length;
  if(n+need<=LIC_QUOTA[key])return true;
  licSheet(key);return false}
function licSheet(key){
  const st=LIC.state,lim=Object.entries(LIC_QUOTA).map(([k,v])=>v+' '+LIC_NOM[k]).join(', ');
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Licence"><div class="sheet"><h2>🔑 Licence Tiango</h2>
   ${key?`<div class="box warn"><b>Limite de la version de démonstration atteinte</b> pour : ${esc(LIC_NOM[key])}. Vos données restent intactes, consultables et exportables.</div>`:''}
   <div class="box">${st==='valide'?`<b>Licence valide</b> au nom de <b>${esc(LIC.nom)}</b>, jusqu'au ${esc(frDate(LIC.exp))} (${LIC.days} jour${LIC.days>1?'s':''}).`:st==='expiree'?`<b>Licence expirée</b> le ${esc(frDate(LIC.exp))} (${esc(LIC.nom)}). Vos données restent intactes, consultables et exportables ; la création de nouveaux éléments est limitée jusqu'au renouvellement.`:'<b>Version de démonstration.</b> Toutes les fonctions sont disponibles, dans la limite de : '+esc(lim)+'.'}</div>
   <div class="f"><label for="licIn">Clé de licence</label><textarea class="code" id="licIn" placeholder="TIANGO-1.…" spellcheck="false" autocapitalize="off"></textarea></div>
   <div class="row" style="margin-top:12px"><button class="btn acc grow" id="licGo">Activer la clé</button></div>
   <p class="mute">Pour obtenir ou renouveler une licence (un an) : <a href="mailto:contact@tiango.fr?subject=Licence%20Tiango">contact@tiango.fr</a>.</p>
   <div class="row" style="margin-top:10px"><button class="btn sec grow" id="mNo">Fermer</button></div></div></div>`;
  $('#mNo').onclick=closeModal;
  $('#licGo').onclick=async()=>{const s=$('#licIn').value.trim();if(!s)return toast('Collez d\'abord la clé reçue');
    const r=await licCheck(s);if(r.state==='invalide')return toast('Clé non reconnue : copiez-la en entier, sans espace ajouté',5000);
    try{await DB.put('kv',s,'licence')}catch(e){return toast('Clé non enregistrée : espace insuffisant ?',5000)}
    LIC=r;profilSync();toast(r.state==='valide'?'Licence activée au nom de '+r.nom:'Cette licence est expirée : demandez son renouvellement',5000);if(r.state==='valide')closeModal();if(VIEWS[view]&&VIEWS[view].top)VIEWS[view].r()}}
function licBanner(){
  if(LIC.state==='valide'&&LIC.days>30)return '';
  const t=LIC.state==='valide'?`Votre licence expire dans ${LIC.days} jour${LIC.days>1?'s':''}.`:LIC.state==='expiree'?'Votre licence a expiré.':'Version de démonstration : '+Object.entries(LIC_QUOTA).slice(0,3).map(([k,v])=>v+' '+LIC_NOM[k]).join(', ')+'…';
  return `<div class="box warn" style="margin-top:12px"><b>${esc(t)}</b> <a href="#" id="licOpen">Licence</a></div>`}
document.addEventListener('click',e=>{if(e.target.id==='licOpen'){e.preventDefault();licSheet()}});
/* ================= FORMAT TIANGO : rédaction par une IA, import, export ================= */
const FMT_VIS=`{
 "format": "tiango-visite", "version": 1,
 "site": {"id": "identifiant Tiango du site s'il t'est fourni dans la consigne : recopie-le tel quel, sinon vide", "nom": "nom du site à visiter (ex. Cathédrale Saint-Samson)", "lieu": "ville, région ou pays où il se trouve (ex. Dol-de-Bretagne)", "type": ""},
 "langues": ["fr", "en", "es"],
 "public": "", "fil_rouge": "", "presentation": "",
 "fiche_pratique": [{"rubrique": "Horaires", "contenu": ""}],
 "modules": [{
   "code": "M0", "type": "station | pause | repas | extension", "lieu": "lieu précis de l'arrêt",
   "duree_min": 10, "parole_min": 4,
   "a_voir": "", "message_cle": "", "placement_groupe": "", "consigne": "indication de conduite pour le guide, jamais prononcée",
   "titre": {"fr": "", "en": "", "es": ""},
   "discours": {"fr": "", "en": "", "es": ""}
 }],
 "formules": [{"nom": "Essentiel", "modules": ["M0", "M2"], "pour_qui": ""}],
 "securite": {"fr": "", "en": "", "es": ""},
 "faq": [{"station": "code du module concerné, vide si valable pour toute la visite", "question": {"fr": "", "en": "", "es": ""}, "reponse": {"fr": "", "en": "", "es": ""}}],
 "anecdotes": [{"station": "code du module concerné, vide si générale", "titre": "", "statut": "Fait documenté | Tradition locale | Légende | À vérifier", "texte": {"fr": "", "en": "", "es": ""}}],
 "plan_b": [{"situation": "", "solution": "", "duree": ""}],
 "a_ne_pas_dire": [{"ne_pas_dire": "", "dire": ""}],
 "glossaire": [{"terme": {"fr": "", "en": "", "es": ""}, "note": "définition, prononciation"}],
 "sources": [{"titre": "", "url": "", "fiabilite": "Officielle | Institutionnelle | Secondaire | À recouper"}],
 "a_confirmer": ["question à poser au site avant la visite"]
}`;
const FMT_CTI=`{
 "format": "tiango-cti", "version": 1,
 "titre": "", "precision": "ex. Jour 2 matin", "date": "AAAA-MM-JJ", "heure_debut": "HH:MM", "heure_fin": "HH:MM",
 "entete": {"prestation": "", "clients": "", "effectif": "", "transport": "", "prise_en_charge": "", "fin": "", "maree": "", "soleil": "", "meteo": "", "contacts": "", "urgences": ""},
 "lignes": [{
   "type": "prise_en_charge | trajet | arret | pause | repas | temps_libre | fin",
   "lieu": "", "duree_min": 10, "km": 4,
   "itineraire": "voies et repères à suivre, stationnement",
   "nature": "ex. Déplacement + commentaire à bord, Arrêt commenté",
   "contenu": "contenu et thème du commentaire",
   "remarques": "sécurité, stationnement, WC, PMR, impératifs",
   "a_verifier": "ce qui ne peut être confirmé que sur place, lors du repérage"
 }],
 "pieces_a_joindre": [""],
 "a_completer_apres_reperage": [""]
}`;
const FMT_LIEU=`{
 "format": "tiango-lieu", "version": 1,
 "site": {"nom": "", "type": "Monument historique | Château | Édifice religieux | Musée | Site archéologique | Site naturel | Parc / jardin | Quartier / centre historique | Village | Site industriel / entreprise | Cave / domaine / producteur | Mémorial / site de mémoire | Point de vue / panorama | Restaurant | Hébergement | Autre",
   "adresse": "", "code_postal": "", "commune": "", "pays": "", "site_internet": "", "telephone": "", "email": "", "classement": "", "gestionnaire": ""},
 "horaires": {"ouverture": "HH:MM", "fermeture": "HH:MM", "haute_saison": "", "basse_saison": "", "jours_fermeture": "ex. lundi, mardi", "fermetures_exceptionnelles": "", "derniere_admission": "", "creneaux_groupes": ""},
 "tarifs": {"plein": "", "reduit": "", "enfants": "", "gratuites": "", "groupe": "", "groupe_effectif_min": "", "groupe_effectif_max": "", "scolaires": "", "gratuite_accompagnateur": "Oui | Non | En partie", "reservation_groupes": "Oui | Non | En partie", "delai_reservation": "", "service_reservation": ""},
 "guidage": {"visite_libre": "Oui | Non | En partie", "guide_site_obligatoire": "Oui | Non | En partie", "guide_exterieur_autorise": "Oui | Non | En partie", "carte_guide_exigee": "Oui | Non | En partie", "audioguide": "Oui | Non | En partie", "audioguide_details": "", "visites_guidees": "", "effectif_max_par_guide": "", "regles": ""},
 "accessibilite": {"fauteuil": "Oui | Non | En partie", "fauteuil_details": "", "cheminement": "", "ascenseur": "Oui | Non | En partie", "toilettes_adaptees": "Oui | Non | En partie", "stationnement_pmr": "Oui | Non | En partie"},
 "acces": {"accessible_autocar": "Oui | Non | En partie", "accessible_autocar_details": "", "parking_autocar": "Oui | Non | En partie", "parking_autocar_details": "", "depose_minute": "Oui | Non | En partie", "restrictions": "", "itineraire_car": "", "parking_voiture": "", "transports_en_commun": "", "point_rdv": ""},
 "services": {"toilettes": "Oui | Non | En partie", "toilettes_details": "", "restauration": "Oui | Non | En partie", "restaurants_proches": ""},
 "securite": {"controle": "Oui | Non | En partie", "vigilance": "", "solution_repli": ""},
 "circuit": {"duree_min": 90, "creneau_conseille": "", "themes": "", "publics": "", "pistes_commentaire": ""},
 "etapes": [{"nom": "entrée, cour, salle…", "duree_min": 10, "observation": ""}],
 "budget": [{"poste": "Entrée", "categorie": "Entrées et visites", "calcul": "par_participant | par_personne_avec_accompagnateurs | forfait_groupe", "prix": 0, "quantite": 1, "remarque": ""}],
 "a_confirmer": ["information pratique à vérifier auprès du site"]
}`;
const FMT_CIR=`{
 "format": "tiango-circuit", "version": 1,
 "titre": "", "description": "thème, public, esprit du circuit", "participants": 20, "accompagnateurs": 1,
 "jours": [{
   "titre": "", "debut": "HH:MM",
   "parties": {
     "matin": [{"type": "lieu | repas | temps_libre | activite", "lieu": "nom exact du site (type lieu)", "duree_min": 90, "remarque": ""}],
     "apres_midi": [],
     "soiree": []
   },
   "nuit": "nom du séjour de la nuit (vide le dernier jour)"
 }],
 "sejours": [{"nom": "", "type": "Hôtel | Camping | Gîte / location | Chambre d'hôtes | Autre", "prix_nuit": 0, "calcul": "par_personne | forfait_groupe", "remarque": ""}],
 "postes_budget": [{"poste": "ex. Autocar", "categorie": "Transport", "calcul": "forfait_groupe | par_participant | par_personne_avec_accompagnateurs", "prix": 0, "quantite": 1}]
}`;
function aiPrompt(kind,d){
  const lg=d.langues||'fr, en, es';
  if(kind==='lieu')return `Tu es un guide-conférencier expérimenté et un repéreur rigoureux. Renseigne la fiche du site suivant, au format Tiango.

LIEU : ${d.sujet||'[à préciser]'}${d.lieu?'\nVILLE, PAYS : '+d.lieu:''}${d.plus?'\nPRÉCISIONS : '+d.plus:''}

CE QUI EST ATTENDU
- Les informations pratiques utiles à un guide qui prépare un groupe : horaires et jours de fermeture, tarifs individuels et groupes, réservation, guidage (guide du site obligatoire ? carte de guide exigée ? audioguide ?), accessibilité aux personnes à mobilité réduite, accès et stationnement des autocars, toilettes, restauration, sécurité.
- Les étapes de la visite (entrée, cour, salle, point de vue…) avec une durée raisonnable chacune, et la durée totale à prévoir sur le site.
- Le budget partiel du site : l'entrée et tout coût propre au lieu, avec le mode de calcul.

RÈGLES
- N'invente rien. Ce que tu ne peux pas vérifier sur une source officielle reste VIDE (jamais de valeur plausible) et est repris dans "a_confirmer".
- Pour les champs à choix (Oui | Non | En partie), mets une seule valeur ; en cas de doute, laisse vide.
- Les jours de fermeture s'écrivent avec les noms des jours (lundi, mardi…), sans abréviation.
- Réponds uniquement par un objet JSON valide, sans texte avant ni après, qui respecte exactement cette structure (les valeurs séparées par « | » sont des choix) :

${FMT_LIEU}`;
  if(kind==='cir')return `Tu es un concepteur de circuits touristiques expérimenté. Construis le circuit suivant, au format Tiango.

CIRCUIT : ${d.sujet||'[à préciser]'}${d.lieu?'\nSECTEUR : '+d.lieu:''}
DURÉE ET PÉRIODE : ${d.duree||'à proposer'}
CLIENTS ET TRANSPORT : ${d.public||'à préciser'}${d.plus?'\nPRÉCISIONS : '+d.plus:''}${d.noms?'\n\nLIEUX DÉJÀ ENREGISTRÉS DANS TIANGO (reprends leur nom EXACT quand tu les utilises) :\n'+d.noms:''}

CE QUI EST ATTENDU
- Un programme jour par jour, chaque jour divisé en matin, après-midi et soirée. Une partie peut contenir un ou plusieurs sites, un repas, du temps libre, ou rester vide.
- Pour chaque site : son nom, la durée prévue sur place. Une journée doit rester réaliste (trajets compris).
- Les séjours (hôtel, camping…) avec la nuit à laquelle ils correspondent.
- Les postes de budget propres au circuit (autocar, guide, imprévus), s'ils sont connus.

RÈGLES
- N'invente pas de prix : laisse 0 ou vide ce que tu ne connais pas.
- Utilise le nom exact d'un site déjà enregistré s'il existe ; sinon donne son nom officiel : Tiango créera une fiche à compléter.
- Réponds uniquement par un objet JSON valide, sans texte avant ni après, qui respecte exactement cette structure (les valeurs séparées par « | » sont des choix) :

${FMT_CIR}`;
  const acc=d.role==='acc',role=acc?'guide accompagnateur':'guide-conférencier';
  return kind==='vis'?`Tu es un ${role} expérimenté et un rédacteur rigoureux. Rédige le dossier de visite commentée du site suivant, au format Tiango.

SITE : ${d.sujet||'[à préciser]'}${d.lieu?'\nLIEU : '+d.lieu:''}${d.siteId?'\nIDENTIFIANT TIANGO DU SITE (à recopier dans site.id) : '+d.siteId:''}
RÔLE DU GUIDE : ${acc?'guide accompagnateur — il accompagne le groupe pendant tout le séjour ou la journée ; il n\'est pas le conférencier du site. Son discours est court et utile : mise en contexte, repères pratiques, consignes, anecdotes brèves, passage de relais au guide local ou au conférencier qui prend la visite.':'guide-conférencier — il conduit lui-même la visite commentée du site, avec un discours approfondi à chaque arrêt.'}
LANGUES DU DISCOURS : ${lg}
DURÉE VISÉE : ${d.duree||'à proposer, avec plusieurs formules'}
PUBLIC : ${d.public||'adultes, tous publics'}${d.plus?'\nPRÉCISIONS : '+d.plus:''}${d.pts?`

${d.compl?'POINTS À COMPLÉTER — ce site a déjà un discours ; seuls ces points n\'ont pas encore de module. Rédige un module (ou plusieurs) pour chacun, avec son nom recopié à l\'identique dans le champ "lieu" du module :':'POINTS DU SITE DÉJÀ REPÉRÉS PAR LE GUIDE — chacun doit avoir au moins un module, dans cet ordre, avec son nom recopié à l\'identique dans le champ "lieu" du module :'}
${d.pts}
${d.compl?`
MODULES DÉJÀ EXISTANTS (ne les reprends pas, ne les modifie pas, ne les remplace pas) :
${d.exist}
Numérote tes nouveaux modules à partir de ${d.nextCode} (M pour une station, P pour une pause, EXT- pour une extension) pour ne pas reprendre un code existant.${d.angle?'\nFil rouge du discours existant, à respecter pour le ton : '+d.angle:''}
Laisse vides (tableaux vides, chaînes vides) toutes les rubriques qui ne concernent pas ces nouveaux modules : fiche pratique, formules, sécurité, plan B, glossaire. Des questions fréquentes ou des anecdotes ne sont attendues que si elles concernent ces nouveaux points.`:'Si un point mérite plusieurs discours, fais plusieurs modules. N\'ajoute un module hors de cette liste que s\'il est indispensable (accueil, pause) ; le guide ajoutera lui-même les autres.'}`:''}

CE QUI EST ATTENDU
- Un parcours découpé en modules autonomes (M0 accueil et consignes, M1, M2… ; P1 pour les pauses ; EXT-A… pour les extensions), chacun avec un site précis, une durée sur place, un temps de parole, ce que l'on voit, un message clé et l'endroit où placer le groupe.
- Pour chaque module, le discours complet dans chaque langue demandée : un texte écrit pour être dit, pas lu — phrases courtes, présent de narration, adresse directe au groupe. Chaque langue est rédigée pour son public, pas traduite mot à mot.
- Deux ou trois formules qui assemblent les modules selon la durée disponible.
- Les consignes de sécurité à dire au groupe, des questions fréquentes avec réponse courte, des anecdotes (en précisant pour chacune : fait documenté, tradition locale ou légende), un plan B (pluie, fermeture, retard), les erreurs courantes à ne pas dire, un glossaire, les sources.
- La fiche pratique : horaires, tarifs individuels et groupes, réservation, accès, stationnement des autocars, règlement, prise de parole des guides extérieurs, accessibilité.

RÈGLES
- N'invente rien. Vérifie les faits, dates et chiffres ; cite tes sources dans "sources".
- Toute information pratique que tu ne peux pas vérifier sur une source officielle s'écrit « À CONFIRMER » et est reprise dans "a_confirmer".
- Les champs hors discours (lieu, consigne, message clé, fiche pratique…) sont en français.
- Réponds uniquement par un objet JSON valide, sans texte avant ni après, qui respecte exactement cette structure (les valeurs séparées par « | » sont des choix) :

${FMT_VIS}`
  :`Tu es un guide accompagnateur expérimenté. Construis le cadre technique d'itinéraire (CTI) de la prestation suivante, au format Tiango.

PRESTATION : ${d.sujet||'[à préciser]'}${d.lieu?'\nSECTEUR : '+d.lieu:''}
DATE ET HORAIRES : ${d.duree||'à proposer'}
CLIENTS ET TRANSPORT : ${d.public||'à préciser'}${d.plus?'\nPRÉCISIONS : '+d.plus:''}

CE QUI EST ATTENDU
- Un déroulé minuté, ligne par ligne, qui alterne trajets et arrêts, de la prise en charge à la fin de prestation. La somme des durées doit tenir exactement dans l'horaire.
- Pour chaque trajet : l'itinéraire (voies, repères), les kilomètres, le commentaire à bord. Pour chaque arrêt : le stationnement, le contenu du commentaire, les remarques de sécurité, toilettes, accessibilité, impératifs.
- Dans "a_verifier" : tout ce qui ne peut être confirmé que sur place (chronos réels, noms de voies, capacité des parkings, toilettes, ouverture d'un édifice). Ne l'invente pas.
- La liste des pièces à joindre au dossier et celle des points à compléter après le repérage.

RÈGLES
- N'invente ni distance ni horaire d'ouverture : estime prudemment et signale-le dans "a_verifier".
- Réponds uniquement par un objet JSON valide, sans texte avant ni après, qui respecte exactement cette structure (les valeurs séparées par « | » sont des choix) :

${FMT_CTI}`;
}
async function aiSheet(kind,o={}){
  const d={},V=kind==='vis';
  if(V&&o.siteId){const r=(await live('reps')).map(fixRep).find(x=>x.id===o.siteId);
    if(r){d.siteId=r.id;d.sujet=lieuNom(r);d.lieu=[r.d.ville,r.d.pays].filter(Boolean).join(', ');
      const ex=(await live('items')).filter(x=>x.kind==='vis'&&x.lieuId===r.id).map(fixItem).sort((a,b)=>b.modules.length-a.modules.length)[0];
      d.compl=!!(ex&&ex.modules.length);
      const L_=d.compl?visMiss(ex,r):(r.points||[]).filter(p=>String(p.nom||'').trim());
      d.pts=L_.map(p=>'- '+String(p.nom).trim()+(p.duree?' ('+p.duree+' min)':'')+(p.note?' — '+String(p.note).replace(/\s+/g,' ').trim():'')).join('\n');
      if(d.compl){d.exist=ex.modules.map(m=>'- '+[m.code,m.lieu].filter(Boolean).join(' : ')).join('\n');d.angle=ex.angle||'';d.nextCode=nextMCode(ex)}}}
  if(V)d.role='conf';
  if(kind==='cir')d.noms=(await live('reps')).map(fixRep).filter(r=>!r.ctiId).map(r=>'- '+lieuNom(r)+(r.d.ville?' ('+r.d.ville+')':'')).join('\n');
  const F=kind==='lieu'?[['sujet','Site à décrire (ex. Abbaye du Mont-Saint-Michel)','text','wide'],['lieu','Ville, pays','text'],['plus','Précisions (ce que vous savez déjà, ce qui vous intéresse)','textarea']]
    :kind==='cir'?[['sujet','Circuit (ex. Bretagne nord en 3 jours)','text','wide'],['lieu','Secteur, villes à relier','text'],['duree','Nombre de jours, période','text'],['public','Clients, effectif, transport','text'],['plus','Précisions (lieux imposés, contraintes, rythme)','textarea']]
    :V?[['role','Rôle du guide','select',[['conf','Guide-conférencier : conduit la visite, discours approfondi'],['acc','Guide accompagnateur : accompagne le groupe, repères et relais']]],['sujet','Site à présenter (ex. Cathédrale Notre-Dame de Paris)','text','wide'],['lieu','Ville, pays','text'],['langues','Langues du discours','text'],['duree','Durée visée','text'],['public','Public','text'],['plus','Précisions (angle, contraintes, ce que vous savez déjà)','textarea']]
    :[['sujet','Prestation (ex. Excursion côte sud de Séné)','text','wide'],['lieu','Secteur, communes traversées','text'],['duree','Date, heure de début et de fin','text'],['public','Clients, effectif, moyen de transport','text'],['plus','Précisions (arrêts souhaités, contraintes)','textarea']];
  if(V)d.langues='fr, en, es';
  $('#modal').innerHTML=`<div class="modal"><div class="sheet"><h2>Faire rédiger par une IA</h2>
   ${V&&d.compl&&!d.pts?'<div class="box warn">Tous les points de ce site ont déjà un module dans le discours. Ajoutez d\'abord un point à la fiche du site : la consigne ne portera que sur les points sans module.</div>':''}${V&&d.pts?`<div class="box"><b class="l">${d.compl?'Points sans discours, seuls repris dans la consigne':'Points du site repris dans la consigne'}</b><pre style="white-space:pre-wrap;margin:6px 0 0;font:inherit">${esc(d.pts)}</pre><p class="mute" style="margin:6px 0 0">${d.compl?'Les modules existants ne sont pas touchés : l\'import ajoutera les nouveaux à la suite.':'L\'IA rédige au moins un module par point.'}</p></div>`:V&&d.siteId?'<div class="box warn">Ce site n\'a pas encore de points : le discours sera construit sans eux. Vous pouvez les saisir dans la fiche du site avant de continuer.</div>':''}
   <p class="mute">Tiango prépare la consigne. Copiez-la dans Claude ou dans l'IA de votre choix, puis rapportez sa réponse ici avec « Importer ».</p>
   <div class="grid" id="aiF">${F.map(f=>field(f,d,'ai_')).join('')}</div>
   <div class="f"><label for="aiOut">Consigne à transmettre à l'IA</label><textarea class="code" id="aiOut" readonly></textarea></div>
   <div class="row" style="margin-top:12px"><button class="btn acc grow" id="aiCopy">Copier la consigne</button><button class="btn sec grow" id="aiImp">📥 Importer la réponse</button></div>
   <div class="row" style="margin-top:10px"><button class="btn sec grow" id="mNo">Fermer</button></div></div></div>`;
  const up=()=>$('#aiOut').value=aiPrompt(kind,d);bindFields($('#aiF'),d,up);up();
  $('#mNo').onclick=closeModal;$('#aiImp').onclick=()=>importSheet();
  $('#aiCopy').onclick=async()=>{try{await navigator.clipboard.writeText($('#aiOut').value)}catch(e){$('#aiOut').select();document.execCommand('copy')}toast('Consigne copiée : collez-la dans l\'IA')};
}
function importSheet(){
  $('#modal').innerHTML=`<div class="modal"><div class="sheet"><h2>Importer</h2>
   <p class="mute">Collez ici la réponse de l'IA (lieu, circuit, visite ou CTI au format Tiango), ou choisissez un fichier : sauvegarde Tiango, visite ou CTI.</p>
   <textarea class="code" id="impTxt" placeholder='{ "format": "tiango-visite", … }'></textarea>
   <div class="row" style="margin-top:12px"><button class="btn acc grow" id="impGo">Importer le texte collé</button><button class="btn sec grow" id="impFile">Choisir un fichier</button></div>
   <div class="row" style="margin-top:10px"><button class="btn sec grow" id="mNo">Annuler</button></div></div></div>`;
  $('#mNo').onclick=closeModal;$('#impFile').onclick=()=>{const i=$('#fImp');i.value='';i.click()};
  $('#impGo').onclick=async()=>{const t=$('#impTxt').value;if(!t.trim())return toast('Collez d\'abord le texte à importer');try{await importAny(t);}catch(x){toast('Import impossible : '+x.message,6000)}};
}
async function importAny(text){
  const a=text.indexOf('{'),b=text.lastIndexOf('}');if(a<0||b<a)throw new Error('aucune donnée au format Tiango dans ce texte');
  let j;try{j=JSON.parse(text.slice(a,b+1))}catch(e){throw new Error('le texte est incomplet ou mal formé (réponse de l\'IA coupée ?). Demandez-lui de renvoyer le JSON complet')}
  if(!j||typeof j!=='object')throw new Error('format non reconnu');
  if(j.app==='reperage-guide'){closeModal();return importBackup(j)}
  if(j.format==='tiango-annuaire'){closeModal();return preImport(j)}
  if(j.format==='tiango-lieu')return lieuImport(j);
  if(j.format==='tiango-circuit')return cirImport(j);
  const gk=j.format==='tiango-visite'?'vis':j.format==='tiango-cti'?'cti':j.format==='tiango-lieu'?'reps':j.format==='tiango-circuit'?'cir':null;
  if(gk&&gk!=='vis'&&!(await gate(gk)))return;   /* discours : le quota ne joue que si un nouveau discours est créé (pas en complétant l'existant) */
  if(j.format==='tiango-lieu')return lieuImport(j);
  if(j.format==='tiango-circuit')return cirImport(j);
  const it=j.format==='tiango-visite'?visIn(j):j.format==='tiango-cti'?ctiIn(j):null;
  if(!it)throw new Error('format non reconnu : il faut une sauvegarde Tiango, des contacts (tiango-annuaire), un site (tiango-lieu), un circuit (tiango-circuit), un site à visiter (tiango-visite) ou un CTI (tiango-cti)');
  let nl=0,r=null;
  if(it.kind==='vis'){const reps=(await live('reps')).map(fixRep).filter(x=>!x.ctiId),nm=t=>strip(t).replace(/[^a-z0-9]+/g,' ').trim(),k=nm(it.nom);
    const sid=it._sid;delete it._sid;const byId=sid&&reps.find(x=>x.id===sid);
    if(byId){r=byId;it.lieuId=r.id}
    else if(k){const kv=nm(it.lieu),same=reps.filter(x=>nm(lieuNom(x))===k),byV=kv?same.filter(x=>!nm(x.d.ville)||nm(x.d.ville)===kv):same;
      r=byV.length===1?byV[0]:null;
      /* plusieurs sites du même nom, ou lieu différent : on ne devine pas, on demande */
      if(same.length&&!r){const ch=await chooseSite(same,it);if(ch===null)return;r=ch==='new'?null:same.find(x=>x.id===ch)}
      if(!r){r={id:uid(),created:Date.now(),updated:Date.now(),d:{site:it.nom.trim(),ville:String(it.lieu||'').trim(),type:TYPES.includes(it.type)?it.type:'',pays:'France',notes:'Fiche créée par l\'import d\'un discours de visite : à compléter au repérage (horaires, tarifs, accessibilité…).'},gps:null,points:[],bud:[],np:0,nd:0,cover:''};nl=1}
      else if(!String(r.d.ville||'').trim()&&it.lieu){r.d.ville=String(it.lieu).trim();r.updated=Date.now();nl=2}
      if(r)it.lieuId=r.id}
    const ex=r?(await live('items')).filter(x=>x.kind==='vis'&&x.lieuId===r.id&&(x.modules||[]).length).map(fixItem).sort((a,b)=>b.updated-a.updated)[0]:null;
    if(ex){const ch=await visMerge(ex,it,r);if(ch==='done')return;if(ch==='cancel')return}   /* ce site a déjà un discours : on le complète, on ne l'écrase pas */
    const vides=r?(await live('items')).filter(x=>x.kind==='vis'&&x.lieuId===r.id&&x.id!==it.id&&!(x.modules||[]).length).map(x=>x.id):[];   /* discours vide créé à la main : remplacé par celui de l'IA */
    if(!vides.length&&!(await gate('vis')))return;
    await txm(['reps','items'],S=>{if(r&&nl)S('reps').put(r);S('items').put(it);vides.forEach(i=>S('items').delete(i))});modTouch()}
  else await DB.put('items',it);
  closeModal();toast(it.kind==='vis'?`Discours importé : ${it.modules.length} modules, ${it.langs.map(l=>l.toUpperCase()).join(', ')}`+(r?(nl===1?' · nouveau site créé : '+lieuNom(r):' · site : '+lieuNom(r)):' · site à choisir')+(visIn.dup&&visIn.dup.length?' · codes en double renumérotés : '+visIn.dup.join(', '):''):`CTI importé : ${it.lignes.length} lignes`,5500);go(it.kind,it.id);
}
const St=v=>v==null?'':typeof v==='object'?JSON.stringify(v):String(v), A=v=>Array.isArray(v)?v:[], O=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const MLO=v=>typeof v==='string'?{fr:v}:Object.fromEntries(Object.entries(O(v)).filter(([k])=>/^[a-z]{2,3}(-[a-z0-9]{2,4})?$/i.test(k)).map(([k,x])=>[k.toLowerCase(),St(x)]));
function visIn(j){
  const v=NEW.vis(),s=O(j.site);
  Object.assign(v,{nom:St(s.nom||j.nom),lieu:St(s.lieu),type:St(s.type),public:St(j.public),angle:St(j.fil_rouge),resume:St(j.presentation),
    fiche:A(j.fiche_pratique).map(x=>({r:St(x.rubrique),c:St(x.contenu)})),
    modules:A(j.modules).map(m=>({code:St(m.code),type:/pause/i.test(m.type)?'pause':/repas|d[ée]jeuner|d[iî]ner/i.test(m.type)?'repas':/ext/i.test(m.type)?'extension':'station',lieu:St(m.lieu),duree:St(m.duree_min),parole:St(m.parole_min),voir:St(m.a_voir),cle:St(m.message_cle),place:St(m.placement_groupe),consigne:St(m.consigne),titre:MLO(m.titre),texte:MLO(m.discours),statut:St(m.statut),valide:St(m.valide_par),src:St(m.source)})),
    formules:A(j.formules).map(f=>({nom:St(f.nom),codes:A(f.modules).map(St).join(', ')||St(f.modules),pour:St(f.pour_qui)})),
    secu:MLO(j.securite),faq:A(j.faq).map(f=>({stat:St(f.station),q:MLO(f.question),r:MLO(f.reponse)})),
    anec:A(j.anecdotes).map(a=>({stat:St(a.station),titre:St(a.titre),statut:St(a.statut),texte:MLO(a.texte)})),
    planb:A(j.plan_b).map(p=>({sit:St(p.situation),sol:St(p.solution),duree:St(p.duree)})),
    nepas:A(j.a_ne_pas_dire).map(p=>({non:St(p.ne_pas_dire),oui:St(p.dire)})),
    gloss:A(j.glossaire).map(g=>({t:MLO(g.terme),note:St(g.note)})),
    sources:A(j.sources).map(x=>typeof x==='string'?{titre:x}:{titre:St(x.titre),url:St(x.url),fiab:St(x.fiabilite)}),
    conf:A(j.a_confirmer).map(t=>({t:St(t),done:false}))});
  const seen=new Set(A(j.langues).map(l=>St(l).toLowerCase()));v.modules.forEach(m=>Object.keys(m.texte).forEach(l=>seen.add(l)));v.langs=[...seen];fixItem(v);   /* codes de langue contrôlés */
  if(!v.modules.length)throw new Error('cette visite ne contient aucun module');
  /* codes de module en double : rendus uniques (suffixe -2, -3…) pour que les formules ne retrouvent pas le mauvais module */
  const used=new Map();visIn.dup=[];v.modules.forEach(m=>{const k=(m.code||'').trim().toLowerCase();if(!k)return;const n=(used.get(k)||0)+1;used.set(k,n);if(n>1){const o=m.code;m.code=String(m.code).trim()+'-'+n;visIn.dup.push(o+' → '+m.code)}});
  v._sid=St(s.id);
  return v;
}
const visOut=v=>({format:'tiango-visite',version:1,site:{id:v.lieuId||'',nom:v.nom,lieu:v.lieu,type:v.type},langues:v.langs,public:v.public,fil_rouge:v.angle,presentation:v.resume,
  fiche_pratique:v.fiche.map(x=>({rubrique:x.r,contenu:x.c})),
  modules:v.modules.map(m=>({code:m.code,type:m.type,lieu:m.lieu,duree_min:num(m.duree),parole_min:num(m.parole),a_voir:m.voir,message_cle:m.cle,placement_groupe:m.place,consigne:m.consigne,statut:m.statut||'',valide_par:m.valide||'',source:m.src||'',titre:m.titre||{},discours:m.texte||{}})),
  formules:v.formules.map(f=>({nom:f.nom,modules:String(f.codes||'').split(/[,;→>·\n]+/).map(s=>s.trim()).filter(Boolean),pour_qui:f.pour})),
  securite:v.secu||{},faq:v.faq.map(f=>({station:f.stat||'',question:f.q||{},reponse:f.r||{}})),anecdotes:v.anec.map(a=>({station:a.stat||'',titre:a.titre,statut:a.statut,texte:a.texte||{}})),
  plan_b:v.planb.map(p=>({situation:p.sit,solution:p.sol,duree:p.duree})),a_ne_pas_dire:v.nepas.map(p=>({ne_pas_dire:p.non,dire:p.oui})),
  glossaire:v.gloss.map(g=>({terme:g.t||{},note:g.note})),sources:v.sources.map(s=>({titre:s.titre,url:s.url,fiabilite:s.fiab})),a_confirmer:v.conf.map(c=>c.t)});
function ctiIn(j){
  const c=NEW.cti(),e=O(j.entete),TY={prise_en_charge:'pec',pec:'pec',trajet:'trajet',arret:'arret','arrêt':'arret',pause:'pause',repas:'repas',temps_libre:'libre',libre:'libre',fin:'fin'};
  const tm=s=>/^\d{1,2}[:h]\d{2}$/.test(St(s))?St(s).replace('h',':').padStart(5,'0'):'';
  Object.assign(c,{titre:St(j.titre),sous:St(j.precision),date:/^\d{4}-\d{2}-\d{2}$/.test(St(j.date))?j.date:'',debut:tm(j.heure_debut)||'09:00',fin:tm(j.heure_fin),
    lignes:A(j.lignes).map(l=>{const ty=TY[St(l.type).toLowerCase().trim()]||'arret';return {id:uid(),type:ty,lieu:St(l.lieu),duree:St(l.duree_min),km:l.km?St(l.km):'',itin:St(l.itineraire),nature:St(l.nature)||LT[ty][1],contenu:St(l.contenu),rem:St(l.remarques),todo:St(l.a_verifier)}}),
    pieces:A(j.pieces_a_joindre).filter(Boolean).map(t=>({t:St(t),done:false})),apres:A(j.a_completer_apres_reperage).filter(Boolean).map(t=>({t:St(t),done:false}))});
  for(const [a,b] of [['prestation','prestation'],['clients','clients'],['effectif','effectif'],['transport','transport'],['prise_en_charge','pec'],['fin','finlieu'],['maree','maree'],['soleil','soleil'],['meteo','meteo'],['contacts','contacts']])if(e[a])c.h[b]=St(e[a]);
  if(e.urgences)c.h.urgences=St(e.urgences);
  if(!c.lignes.length)throw new Error('ce CTI ne contient aucune ligne');
  return c;
}

/* ---------- Sites et circuits au format Tiango ---------- */
const ynIn=v=>{const t=strip(St(v)).trim();return /^(oui|o|yes|true|1)$/.test(t)?'Oui':/^(non|n|no|false|0)$/.test(t)?'Non':/part|limit|certain/.test(t)?'En partie':''};
const timeIn=s=>/^\d{1,2}[:h]\d{2}$/.test(St(s).trim())?St(s).trim().replace('h',':').padStart(5,'0'):'';
const modeIn=v=>{const t=strip(St(v));return /accomp|avec_acc|pa$/.test(t)?'pa':/forfait|fixe|groupe$/.test(t)&&!/participant|personne/.test(t)?'fixe':/forfait|fixe/.test(t)?'fixe':/personne|pers/.test(t)&&!/participant/.test(t)?'pa':'pp'};
const catIn=v=>BCAT.find(c=>strip(c)===strip(St(v)))||'Divers';
const budIn=a=>A(a).map(x=>({id:uid(),poste:St(O(x).poste),cat:catIn(O(x).categorie),mode:modeIn(O(x).calcul),pu:O(x).prix?St(O(x).prix):'',qte:O(x).quantite?St(O(x).quantite):'1',note:St(O(x).remarque)})).filter(l=>l.poste);
function lieuIn(j){
  const s=O(j.site),h=O(j.horaires),t=O(j.tarifs),g=O(j.guidage),p=O(j.accessibilite),a=O(j.acces),v=O(j.services),x=O(j.securite),c=O(j.circuit),d={};
  const T=(k,v)=>{const z=St(v).trim();if(z)d[k]=z},Y=(k,v,det)=>{const z=ynIn(v);if(z)d[k]=z;if(det)T(k+'_d',det)};
  T('site',s.nom);T('type',TYPES.includes(St(s.type))?s.type:'');T('adresse',s.adresse);T('cp',s.code_postal);T('ville',s.commune);T('pays',s.pays);T('web',s.site_internet);T('tel',s.telephone);T('mail',s.email);T('classement',s.classement);T('gestion',s.gestionnaire);
  if(timeIn(h.ouverture))d.h_ouv=timeIn(h.ouverture);if(timeIn(h.fermeture))d.h_fer=timeIn(h.fermeture);
  T('h_haute',h.haute_saison);T('h_basse',h.basse_saison);T('h_ferm',h.jours_fermeture);T('h_except',h.fermetures_exceptionnelles);T('h_dern',h.derniere_admission);T('h_grp',h.creneaux_groupes);
  T('t_plein',t.plein);T('t_red',t.reduit);T('t_enf',t.enfants);T('t_grat',t.gratuites);T('t_grp',t.groupe);T('t_grp_min',t.groupe_effectif_min);T('t_grp_max',t.groupe_effectif_max);T('t_scol',t.scolaires);Y('t_acc',t.gratuite_accompagnateur);Y('t_resa',t.reservation_groupes);T('t_delai',t.delai_reservation);T('t_resa_ct',t.service_reservation);
  Y('g_libre',g.visite_libre);Y('g_site',g.guide_site_obligatoire);Y('g_ext',g.guide_exterieur_autorise);Y('g_conf',g.carte_guide_exigee);Y('g_audio',g.audioguide);T('g_audio_l',g.audioguide_details);T('g_vg',g.visites_guidees);T('g_max',g.effectif_max_par_guide);T('g_regles',g.regles);
  Y('p_acc',p.fauteuil,p.fauteuil_details);T('p_chem',p.cheminement);Y('p_asc',p.ascenseur);Y('p_wc',p.toilettes_adaptees);Y('p_park',p.stationnement_pmr);
  Y('a_carok',a.accessible_autocar,a.accessible_autocar_details);Y('a_car',a.parking_autocar);T('a_car_d',a.parking_autocar_details);Y('a_depose',a.depose_minute);T('a_gabarit',a.restrictions);T('a_itin',a.itineraire_car);T('a_vl',a.parking_voiture);T('a_tc',a.transports_en_commun);T('a_rdv',a.point_rdv);
  Y('s_wc',v.toilettes);T('s_wc_d',v.toilettes_details);Y('s_resto',v.restauration);T('s_resto_p',v.restaurants_proches);
  Y('x_ctrl',x.controle);T('x_risq',x.vigilance);T('x_planb',x.solution_repli);
  if(num(c.duree_min))d.c_duree=String(num(c.duree_min));T('c_creneau',c.creneau_conseille);T('c_themes',c.themes);T('c_public',c.publics);T('c_comment',c.pistes_commentaire);
  const conf=A(j.a_confirmer).map(St).filter(Boolean);if(conf.length)d.notes='À CONFIRMER :\n'+conf.map(z=>'• '+z).join('\n');
  d.date='';
  const r={id:uid(),created:Date.now(),updated:Date.now(),d,gps:null,points:A(j.etapes).map(e=>({id:uid(),nom:St(O(e).nom),note:St(O(e).observation),duree:O(e).duree_min?St(O(e).duree_min):'',gps:null})).filter(q=>q.nom||q.note),bud:budIn(j.budget),np:0,nd:0,cover:''};
  if(!d.site)throw new Error('ce site n\'a pas de nom (site.nom)');
  return fixRep(r)}
async function lieuImport(j){
  const r=lieuIn(j),ex=(await live('reps')).find(x=>strip(lieuNom(x))===strip(r.d.site));
  const go_=async()=>{await DB.put('reps',r);closeModal();toast('Site importé : '+r.d.site+' ('+r.points.length+' étapes, '+Object.keys(r.d).length+' champs renseignés)',5000);openLieu(r.id);setTimeout(()=>discoursChoice(r.id,'Le site « '+r.d.site+' » est importé.'),150)};
  if(!ex)return go_();
  confirmBox('Un site de ce nom existe déjà','« '+lieuNom(ex)+' » est déjà dans vos sites. Le nouveau site sera ajouté à côté, sans toucher à l\'existant : vous pourrez comparer, puis supprimer l\'un des deux.','Importer quand même',go_)}
async function cirImport(j){
  const c=NEW.cir(),P=O(j.parties),reps=(await live('reps')).map(fixRep).filter(r=>!r.ctiId),mk=[],made=new Map();
  const find=nm=>{const k=strip(St(nm)).trim();if(!k)return null;if(made.has(k))return made.get(k);
    let r=reps.find(x=>strip(lieuNom(x)).trim()===k)||reps.find(x=>{const n=strip(lieuNom(x)).trim();return n.length>4&&k.length>4&&(n.includes(k)||k.includes(n))});
    if(!r){r={id:uid(),created:Date.now(),updated:Date.now(),d:{site:St(nm).trim(),pays:'France',notes:'Fiche créée par l\'import d\'un circuit : à compléter (horaires, tarifs, accessibilité…).'},gps:null,points:[],bud:[],np:0,nd:0,cover:''};mk.push(r);reps.push(r)}
    made.set(k,r);return r};
  const TY={lieu:'lieu',repas:'repas',temps_libre:'libre',libre:'libre',activite:'autre','activité':'autre',autre:'autre'};
  const ent=e=>{e=O(e);const t=TY[strip(St(e.type)).replace(/[\s-]+/g,'_')]||(e.lieu?'lieu':'libre');const o={id:uid(),t,lieuId:'',presId:'',duree:e.duree_min?St(e.duree_min):'',note:St(e.remarque),pu:''};
    if(t==='lieu'){const r=find(e.lieu);o.lieuId=r?r.id:'';if(!r)o.t='libre'}else if(t!=='lieu'&&e.lieu&&!o.note)o.note=St(e.lieu);return o};
  const sej=A(j.sejours).map(x=>{x=O(x);return {id:uid(),type:SEJ_TYPES.includes(St(x.type))?St(x.type):'Hôtel',nom:St(x.nom),presId:'',mode:/forfait|groupe/.test(strip(St(x.calcul)))?'fixe':'pa',pu:x.prix_nuit?St(x.prix_nuit):'',note:St(x.remarque)}});
  c.jours=A(j.jours).map(jr=>{jr=O(jr);const p=O(jr.parties),o=newJour();o.titre=St(jr.titre);o.debut=timeIn(jr.debut)||'09:00';
    o.parts.matin=A(p.matin).map(ent);o.parts.apres=A(p.apres_midi||p.apres).map(ent);o.parts.soir=A(p.soiree||p.soir).map(ent);
    const sn=strip(St(jr.nuit)).trim(),s=sn&&sej.find(x=>strip(x.nom).trim()===sn);o.sejId=s?s.id:'';return o});
  if(!c.jours.length)throw new Error('ce circuit ne contient aucun jour');
  Object.assign(c,{titre:St(j.titre),desc:St(j.description),pax:St(j.participants||'20'),acc:j.accompagnateurs===undefined?'1':St(j.accompagnateurs),sejours:sej,bud:budIn(j.postes_budget)});
  fixItem(c);
  await txm(['reps','items'],S=>{mk.forEach(r=>S('reps').put(r));S('items').put(c)});
  closeModal();toast(`Circuit importé : ${c.jours.length} jour(s), ${cirLieuIds(c).length} site(s)`+(mk.length?` · ${mk.length} nouvelle(s) fiche(s) de site à compléter`:''),6500);go('cir',c.id)}

/* import d'un discours : plusieurs sites portent le même nom, ou le lieu annoncé diffère de celui du site retrouvé */
function chooseSite(cands,it){return new Promise(res=>{
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Rattacher le discours à quel site ?"><div class="sheet"><h2>Rattacher le discours à quel site ?</h2>
   <p class="mute">Le discours « ${esc(it.nom)} »${it.lieu?' est annoncé pour le lieu « '+esc(it.lieu)+' »':''}. Plusieurs fiches de site correspondent, ou leur lieu diffère : choisissez.</p>
   <div style="display:grid;gap:10px;margin-top:12px">${cands.map(r=>`<button class="btn sec" data-s="${esc(r.id)}">${esc(lieuNom(r))}${r.d.ville?' — '+esc(r.d.ville):' — lieu non précisé'}</button>`).join('')}
   <button class="btn sec" data-s="new">Créer un nouveau site${it.lieu?' à '+esc(it.lieu):''}</button><button class="btn" data-s="">Annuler l'import</button></div></div></div>`;
  $$('#modal [data-s]').forEach(b=>b.onclick=()=>{closeModal();res(b.dataset.s===''?null:b.dataset.s)})})}

/* ---------- Import d'un discours pour un site qui en a déjà un : on complète, on n'écrase rien ---------- */
function visMerge(ex,it,r){return new Promise(res=>{
  const dupOf=m=>ex.modules.find(x=>(m.lieu&&sameName(m.lieu,x.lieu))||sameName(m.titre&&m.titre.fr,x.titre&&x.titre.fr)&&nmz(m.titre&&m.titre.fr)||(x.code&&m.code&&String(x.code).trim().toLowerCase()===String(m.code).trim().toLowerCase()&&sameName(m.lieu,x.lieu)));
  const rows=it.modules.map((m,i)=>({m,i,d:dupOf(m)}));
  const n=rows.filter(x=>!x.d).length;
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Compléter le discours"><div class="sheet"><h2>Ce site a déjà un discours</h2>
   <p class="mute">« ${esc(ex.nom||lieuNom(r))} » compte déjà ${ex.modules.length} module${ex.modules.length>1?'s':''}. Rien n'est écrasé : cochez les modules à ajouter à la suite. Ceux qui ressemblent à un module existant sont décochés.</p>
   <div style="max-height:46vh;overflow:auto">${rows.map(x=>`<label class="doc" style="display:flex;gap:10px;align-items:flex-start;padding:8px 0"><input type="checkbox" data-mi="${x.i}"${x.d?'':' checked'} style="margin-top:4px"><span><b>${esc([x.m.code,x.m.lieu].filter(Boolean).join(' — ')||'Module')}</b>${x.d?`<br><span class="mute">semble déjà présent : « ${esc([x.d.code,x.d.lieu].filter(Boolean).join(' — '))} »</span>`:'<br><span class="mute">nouveau</span>'}</span></label>`).join('')}</div>
   <div class="row" style="margin-top:14px"><button class="btn sec grow" id="mgNo">Annuler</button><button class="btn acc grow" id="mgOk">Ajouter à ce discours</button></div>
   <div class="row" style="margin-top:8px"><button class="btn sec grow" id="mgSep">Créer plutôt un discours séparé</button></div></div></div>`;
  $('#mgNo').onclick=()=>{closeModal();res('cancel')};
  $('#mgSep').onclick=()=>res('separate');
  $('#mgOk').onclick=async()=>{
    const pick=$$('#modal [data-mi]').filter(c=>c.checked).map(c=>it.modules[+c.dataset.mi]);
    if(!pick.length)return toast('Cochez au moins un module');
    const used=new Set(ex.modules.map(m=>String(m.code||'').trim().toLowerCase())),remap={};
    pick.forEach(m=>{const k=String(m.code||'').trim(),pre=(/^[A-Za-z-]+/.exec(k)||['M'])[0];
      if(!k||used.has(k.toLowerCase())){let n=1+Math.max(0,...[...used].map(c=>{const x=new RegExp('^'+pre.replace(/-/g,'\\-')+'(\\d+)$','i').exec(c);return x?+x[1]:0}));let c=pre+n;while(used.has(c.toLowerCase()))c=pre+(++n);if(k)remap[k]=c;m.code=c}
      used.add(String(m.code).toLowerCase());
      const pt=(r.points||[]).find(p=>modCovers(m,p));if(pt)m.ptId=pt.id});
    ex.modules.push(...pick);
    for(const l of it.langs||[])if(!ex.langs.includes(l))ex.langs.push(l);
    const key=(a,f)=>new Set(a.map(f).map(nmz)),addNew=(dst,src,f,fix)=>{const k=key(dst,f);src.forEach(x=>{const kx=nmz(f(x));if(kx&&!k.has(kx)){k.add(kx);dst.push(fix?fix(x):x)}})};
    const rm=c=>remap[String(c||'').trim()]||c;
    addNew(ex.faq,it.faq,x=>x.q&&x.q.fr,x=>({...x,stat:rm(x.stat)}));
    addNew(ex.anec,it.anec,x=>x.titre,x=>({...x,stat:rm(x.stat)}));
    addNew(ex.planb,it.planb,x=>x.sit);addNew(ex.nepas,it.nepas,x=>x.non);addNew(ex.gloss,it.gloss,x=>x.t&&x.t.fr);
    addNew(ex.sources,it.sources,x=>x.titre||x.url);addNew(ex.conf,it.conf,x=>x.t);
    ex.updated=Date.now();await DB.put('items',ex);modTouch();closeModal();
    toast(pick.length+' module'+(pick.length>1?'s':'')+' ajouté'+(pick.length>1?'s':'')+' au discours existant',5000);go('vis',ex.id);res('done')}})}
/* ================= MODE CONDUITE : dérouler le CTI le jour de la prestation =================
   Le CTI de référence n'est jamais modifié pendant la conduite. Tout ce qui se passe sur place (heures réelles, durées
   raccourcies, arrêts annulés, constats) est noté dans c.run ; au retour, l'utilisateur choisit ce qu'il reporte. */
let runT=null, runWL=null;
const nowMin=()=>tsMin(Date.now());
const tsMin=t=>{const d=new Date(t);return d.getHours()*60+d.getMinutes()+d.getSeconds()/60};
const dMin=(a,b)=>{let d=a-b;while(d>720)d-=1440;while(d<-720)d+=1440;return d};   /* écart entre deux heures d'horloge, minuit compris */
const sgn=d=>{d=Math.round(d);return d>=2?'Retard de '+mins(d):d<=-2?'Avance de '+mins(-d):'À l\'heure'};
const lab=l=>(LT[l.type]||LT.arret)[0]+(l.lieu?' — '+l.lieu:'');
const jusRun=l=>(l.docs||[]).map(d=>`<div class="doc"><span class="grow" style="min-width:0;word-break:break-word">📎 ${esc(d.name)}</span><button type="button" class="btn sec sm" data-jo="${esc(d.id)}">Ouvrir</button></div>`).join('');
const bindJo=root=>$$('[data-jo]',root).forEach(b=>b.onclick=()=>openJus(b.dataset.jo));
function getRun(c){const r=obj(c.run),n=c.lignes.length;
  c.run={t0:+r.t0||0,i:Math.max(0,Math.min(Math.round(+r.i||0),Math.max(0,n-1))),log:obj(r.log),ov:obj(r.ov),done:!!r.done,end:+r.end||0};return c.run}
const runEff=(r,l)=>{const o=obj(r.ov[l.id]);return o.skip?0:blank(o.duree)?num(l.duree):num(o.duree)};
/* horaires prévus (référence) et horaires projetés (compte tenu de l'heure qu'il est et des adaptations du jour) */

const RUN_MSG=[['Rendez-vous ici à {h}.','Meet back here at {h}.','Nos vemos aquí a las {h}.','Treffpunkt hier um {h} Uhr.','Appuntamento qui alle {h}.','Encontro aqui às {h}.'],
 ['Restez groupés et suivez-moi.','Please stay together and follow me.','Por favor, manténganse juntos y síganme.','Bitte bleiben Sie zusammen und folgen Sie mir.','Restate insieme e seguitemi.','Fiquem juntos e sigam-me.'],
 ['Nous comptons le groupe.','We are counting the group.','Vamos a contar al grupo.','Wir zählen die Gruppe.','Contiamo il gruppo.','Vamos contar o grupo.'],
 ['Le départ est à {h}, merci d\'être à l\'heure.','We leave at {h}, please be on time.','Salimos a las {h}, sean puntuales.','Abfahrt um {h} Uhr, bitte pünktlich.','Si parte alle {h}, siate puntuali.','Partimos às {h}, sejam pontuais.'],
 ['Attention à la circulation.','Watch out for traffic.','Cuidado con el tráfico.','Achtung, Verkehr.','Attenzione al traffico.','Atenção ao trânsito.']];
const RUN_LG=['Français','English','Español','Deutsch','Italiano','Português'];
function runCalc(c){
  const r=c.run,L=c.lignes,plan=[];let t=t2m(c.debut);L.forEach(l=>{t+=impWait(t,l);plan.push(t);t+=num(l.duree)});
  const endPlan=t,k=ctiCalc(c),target=k.prev===null?endPlan:t2m(c.debut)+k.prev,proj=[],arr=[],wt=[],now=nowMin();let e=null,rest=0,late=0;
  if(r.t0&&!r.done&&L.length){const l=L[r.i],s=obj(r.log[l.id]).t0?tsMin(r.log[l.id].t0):now,el=Math.max(0,dMin(now,s)),eff=runEff(r,l);
    proj[r.i]=s;e=s+Math.max(eff,el);rest=eff-el;late=dMin(e,plan[r.i]+num(l.duree));
    for(let j=r.i+1;j<L.length;j++){const sk=obj(r.ov[L[j].id]).skip,w=sk?0:impWait(e,L[j]);arr[j]=e;wt[j]=w;e+=w;proj[j]=e;e+=runEff(r,L[j])}}
  const imp=[];L.forEach((l,j)=>{if(l.imp&&l.hfix&&proj[j]!==undefined&&j>=r.i&&!obj(r.ov[l.id]).skip){const f=t2m(l.hfix),a=j===r.i?proj[j]:arr[j];let d=a-f;if(d<-720)d+=1440;if(d>720)d-=1440;imp.push({l,j,late:Math.round(d),fix:f,arr:a,wait:wt[j]||0})}});
  return {plan,proj,endPlan,target,endProj:e,rest,late,lateEnd:e===null?0:dMin(e,target),imp}}
/* numéros de téléphone cliquables dans un texte libre */
const SHORT=new Set(['15','17','18','112','114','115','196']);
const telify=(s,short)=>esc(s).replace(/\+?\d[\d .]{7,}\d|\d+/g,m=>m.replace(/\D/g,'').length>=9||(short&&SHORT.has(m))?`<a href="tel:${m.replace(/[^+\d]/g,'')}" style="color:var(--pri);font-weight:650">${m}</a>`:m);
const sheetHTML=(t,body)=>`<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(t)}"><div class="sheet"><h2>${esc(t)}</h2>${body}<div class="row" style="margin-top:14px"><button class="btn grow" id="mNo">Fermer</button></div></div></div>`;
const bx2=(l,html,c='')=>html?`<div class="box ${c}"><b class="l">${l}</b><span style="white-space:pre-wrap">${html}</span></div>`:'';

VIEWS.ctiRun={item:1,back:'cti',t:()=>esc(item.titre||'CTI')+sub2('Conduite de la prestation'),async r(){
  const c=item,r=getRun(c),L=c.lignes,reps=(await live('reps')).map(fixRep),vis=(await live('items')).filter(i=>i.kind==='vis').map(fixItem);
  if(item!==c||view!=='ctiRun')return;clearInterval(runT);
  if(!L.length){$('#main').innerHTML='<div class="empty"><b>Ce CTI n\'a pas encore de déroulé</b>Ajoutez des trajets et des arrêts avant de le conduire.</div>';return}
  /* ----- avant le départ ----- */
  if(!r.t0){const k=runCalc(c);
    $('#main').innerHTML=`<div class="card"><h2 style="font-size:20px">${esc(c.titre||'Prestation')}</h2><p class="mute">${esc([c.sous,frDate(c.date)].filter(Boolean).join(' · '))}</p>
      <div class="kpis"><div class="kpi"><b>${hm(k.plan[0])}</b><span>départ prévu</span></div><div class="kpi"><b>${hm(k.target)}</b><span>fin prévue</span></div><div class="kpi"><b>${L.length}</b><span>étapes</span></div></div>
      <div class="box ${ctiCheck(c).length?'warn':''}"><b class="l">Vérification avant le départ</b>${chkHTML(ctiCheck(c))}</div>${bx2('Prise en charge',esc(c.h.pec||''))}${bx2('Météo et solution de repli',esc(c.h.meteo||''))}
      <div class="row" style="margin-top:14px"><button class="btn acc grow" id="rGo">▶ Démarrer la prestation maintenant</button></div>
      <p class="mute" style="margin-top:10px">Tiango prend l'heure de cet appareil comme heure de départ, puis recale la suite au fil de la journée. Le CTI de référence n'est pas modifié : au retour, vous choisirez ce que vous y reportez.</p></div>`;
    $('#rGo').onclick=()=>{r.t0=Date.now();r.i=0;r.log={[L[0].id]:{t0:r.t0}};r.ov={};r.done=false;saveItem(true);VIEWS.ctiRun.r()};return}
  /* ----- prestation terminée ----- */
  if(r.done){const rows=L.map(l=>({l,g:obj(r.log[l.id]),o:obj(r.ov[l.id])})).map(x=>({...x,reel:x.g.t0&&x.g.t1?Math.max(0,Math.round((x.g.t1-x.g.t0)/6e4)):null}));
    $('#main').innerHTML=`<div class="card"><h2 style="font-size:20px">Prestation terminée</h2><p class="mute">Départ ${hm(tsMin(r.t0))} · fin ${hm(tsMin(r.end))} · le ${new Date(r.t0).toLocaleDateString('fr-FR')}</p>
      <table class="tb"><tr><th>Étape</th><th>Prévu</th><th>Réel</th><th>Compté</th></tr>${rows.map(x=>`<tr><td>${esc(lab(x.l))}${x.g.note?`<br><span class="mute">${esc(x.g.note)}</span>`:''}</td><td>${num(x.l.duree)} min</td><td>${x.o.skip?'annulé':x.reel===null?'—':x.reel+' min'}</td><td>${(x.g.cnt||[]).length?x.g.cnt[x.g.cnt.length-1].n+(x.l.eff?' / '+x.l.eff:''):'—'}</td></tr>`).join('')}</table>
      <div class="row" style="margin-top:14px"><button class="btn grow" id="rRep">↩ Choisir ce que je reporte dans le CTI</button></div>
      <div class="row" style="margin-top:10px"><button class="btn sec grow" id="rNew">Préparer une nouvelle conduite</button></div></div>`;
    $('#rRep').onclick=()=>runReport(c,rows);
    $('#rNew').onclick=()=>confirmBox('Préparer une nouvelle conduite ?','Cette conduite reste dans l\'historique du CTI (heures, constats, comptages). Seule la conduite en cours est remise à zéro. Reportez dans le CTI ce que vous voulez garder.','Continuer',()=>{archRun(c);c.run=null;saveItem(true);VIEWS.ctiRun.r()});return}
  /* ----- en cours : une étape à la fois ----- */
  const isSkip=x=>!!obj(r.ov[x.id]).skip,nextLive=()=>{for(let j=r.i+1;j<L.length;j++)if(!isSkip(L[j]))return j;return -1};
  const l=L[r.i],g=r.log[l.id]=obj(r.log[l.id]),rep=reps.find(x=>x.id===l.repId),v=vis.find(x=>x.id===l.visId),last=nextLive()<0;   /* dernière étape utile : toutes les suivantes sont annulées */
  try{if(navigator.wakeLock&&!runWL)navigator.wakeLock.request('screen').then(w=>{runWL=w}).catch(()=>{})}catch(e){}   /* l'écran reste allumé pendant la conduite */
  leave=()=>{clearInterval(runT);try{runWL&&runWL.release()}catch(e){}runWL=null};
  $('#main').innerHTML=`<div style="padding-bottom:76px">
    <div class="row" style="margin-top:12px"><span class="hr" id="rNow" style="font-size:17px"></span><span class="hr t" id="rLate"></span><span class="grow"></span><span class="hr t">${r.i+1} / ${L.length}</span></div>
    <div class="card"><span class="pill">${esc((LT[l.type]||LT.arret)[1])}</span><h2 style="font-size:23px;margin-top:6px">${esc(l.lieu||(LT[l.type]||LT.arret)[0])}</h2>
      <p class="mute" id="rWin"></p><div class="box" id="rRest" style="font-size:17px;font-weight:650"></div>
      ${l.imp?`<div class="box warn"><b class="l">Horaire impératif</b>${l.hfix?'À '+hm(t2m(l.hfix))+' : ne pas décaler':'Ne pas décaler'}</div>`:''}<div id="rImp"></div>
      ${(l.a_dep||l.a_park||l.a_ent||l.a_rdv)?`<div class="box"><b class="l">Plan d'accès</b>${[['Dépose',l.a_dep],['Stationnement',l.a_park],['Entrée',l.a_ent],['Rendez-vous',l.a_rdv]].filter(x=>x[1]).map(x=>`<div><b>${x[0]}</b> : ${esc(x[1])}</div>`).join('')}</div>`:''}
      ${(l.bon||l.conf||l.eff||l.conv||l.lim||(l.docs||[]).length)?`<div class="box"><b class="l">Dossier de l'étape</b>${[['Confirmation',l.conf],['Bon / réservation',l.bon],['Effectif attendu',ctiEff(c,r.i)],['Date limite',l.lim&&frDate(l.lim)],['Convenu',l.conv]].filter(x=>x[1]).map(x=>`<div><b>${x[0]}</b> : ${esc(x[1])}</div>`).join('')}${jusRun(l)}</div>`:''}
      <div id="rRdv"></div>
      ${bx2('Itinéraire',esc(l.itin||''))}${bx2('Commentaire',esc(l.contenu||''))}${bx2('Remarques',esc(l.rem||''),'warn')}${bx2('Constat du repérage',esc(l.obs||''))}${bx2('Non vérifié au repérage',esc(l.todo||''),'warn')}
      <div class="row" style="margin-top:12px">${v?'<button class="btn sec sm grow" id="rVis">🎙 Visite</button>':''}${rep?'<button class="btn sec sm grow" id="rFic">📍 Fiche</button>':''}<button class="btn sec sm grow" id="rTel">☎ Contacts</button><button class="btn sec sm grow" id="rPb">☔ Plan B</button></div>
      <div class="row" style="margin-top:8px"><button class="btn sec sm grow" id="rDoc">📁 Dossier du jour</button><button class="btn sec sm grow" id="rCnt">👥 Compter</button><button class="btn sec sm grow" id="rMsg">💬 Consignes</button></div>
      <div class="f"><label for="rNote">Constat du jour pour cette étape</label><textarea id="rNote" placeholder="Dépose déplacée, WC fermés, groupe en retard…">${esc(g.note||'')}</textarea></div></div>
    <div class="card"><b>Ensuite</b><div id="rNext"></div><div class="box" id="rEnd"></div></div></div>
   <nav class="pnav"><div class="wrap"><button class="btn sec" id="rP" aria-label="Étape précédente"${r.i?'':' disabled'}>‹</button><button class="btn sec" id="rAd">Adapter la suite</button><button class="btn acc" id="rN">${last?'Terminer':'Étape suivante ›'}</button></div></nav>`;
  const tick=()=>{if(view!=='ctiRun'||item!==c||!$('#rNow'))return clearInterval(runT);const k=runCalc(c),eff=runEff(r,l),ov=!blank(obj(r.ov[l.id]).duree);
    $('#rNow').textContent=hm(nowMin());const lt=$('#rLate');lt.textContent=sgn(k.late);lt.style.background=k.late>=2?'var(--no)':k.late<=-2?'var(--ok)':'';lt.style.color=Math.abs(k.late)>=2?'#fff':'';
    $('#rWin').textContent=`Prévu ${hm(k.plan[r.i])}${num(l.duree)?' → '+hm(k.plan[r.i]+num(l.duree))+' · '+num(l.duree)+' min':''} · commencé à ${hm(k.proj[r.i])}`+(ov?` · durée du jour : ${eff} min`:'');
    const rs=$('#rRest');rs.hidden=!eff;rs.textContent=k.rest>=0?`Encore ${mins(Math.ceil(k.rest))} sur cette étape`:`Durée dépassée de ${mins(Math.floor(-k.rest))}`;rs.classList.toggle('warn',k.rest<0);
    $('#rNext').innerHTML=L.slice(r.i+1,r.i+5).map((x,j)=>{const i=r.i+1+j,sk=obj(r.ov[x.id]).skip;return `<div class="doc"><span class="hr${sk?' t':''}">${sk?'annulé':hm(k.proj[i])}</span><span class="grow" style="min-width:0${sk?';text-decoration:line-through':''}">${esc(lab(x))}</span><span class="mute">prévu ${hm(k.plan[i])}</span></div>`}).join('')||'<p class="mute" style="margin:8px 0 0">Dernière étape.</p>';
    const ri=k.imp.filter(x=>x.late>0);$('#rImp').innerHTML=ri.length?`<div class="box warn"><b class="l">Horaire impératif menacé</b>${ri.map(x=>`<div>${esc(lab(x.l))} à ${hm(x.fix)} : arrivée projetée ${hm(k.proj[x.j])}, ${x.late} min trop tard</div>`).join('')}<div class="mute">« Adapter la suite » propose de rogner les arrêts avant cette étape.</div></div>`:'';
    const aw=k.imp.filter(x=>x.wait>=5&&x.j>r.i);$('#rImp').innerHTML+=aw.length?`<div class="box"><b class="l">Attente prévue avant un horaire impératif</b>${aw.map(x=>`<div>${esc(lab(x.l))} à ${hm(x.fix)} : arrivée prévue ${hm(x.arr)}, attente de ${Math.round(x.wait)} min</div>`).join('')}</div>`:'';
    const hh=hm(k.proj[r.i]+eff),rd=l.type==='libre'||l.a_rdv;$('#rRdv').innerHTML=l.type==='libre'?`<div class="box warn cons"><b class="l">Rendez-vous après le temps libre</b>À ${hh}${l.a_rdv?' : '+esc(l.a_rdv):''}</div>`:'';
    const en=$('#rEnd');en.textContent=`Fin prévue ${hm(k.target)} · fin projetée ${hm(k.endProj)} · ${sgn(k.lateEnd).toLowerCase()}`;en.classList.toggle('warn',k.lateEnd>=2)};
  tick();runT=setInterval(tick,5000);
  $('#rNote').oninput=e=>{g.note=e.target.value;saveItem()};
  /* avancer ou reculer en sautant les étapes annulées ; s'il ne reste que des étapes annulées, la prestation se termine */
  const move=d=>{const now=Date.now();
    if(d>0){g.t1=now;const j=nextLive();
      if(j<0){r.done=true;r.end=now;archRun(c)}
      else{r.i=j;const n=r.log[L[j].id]=obj(r.log[L[j].id]);if(!n.t0)n.t0=now;n.t1=0}}
    else{let j=r.i-1;while(j>0&&isSkip(L[j]))j--;if(j<0)return;r.i=j;obj(r.log[L[j].id]).t1=0}
    saveItem(true);window.scrollTo(0,0);VIEWS.ctiRun.r()};
  $('#rN').onclick=()=>last?confirmBox('Terminer la prestation ?',(r.i<L.length-1?'Les étapes restantes sont annulées : elles figureront comme telles au bilan.\n':'')+'L\'heure de fin sera enregistrée. Vous pourrez ensuite choisir ce que vous reportez dans le CTI.','Terminer',()=>move(1)):move(1);
  $('#rP').onclick=()=>move(-1);
  $('#rAd').onclick=()=>runAdapt(c);
  const hnow=()=>{const k=runCalc(c);return hm(k.proj[r.i]+runEff(r,l))};
  $('#rMsg').onclick=()=>{const h=hnow();$('#modal').innerHTML=sheetHTML('Consignes courtes',`<p class="mute">Heure insérée : ${h} (fin de l'étape). Montrez l'écran ou lisez à voix haute.</p>`+RUN_MSG.map(m=>`<details class="sec"><summary>${esc(m[0].replace('{h}',h))}</summary><div class="body">${m.map((t,i)=>`<p style="font-size:19px;margin:6px 0"><span class="mute" style="font-size:12px">${RUN_LG[i]}</span><br>${esc(t.replace('{h}',h))}</p>`).join('')}</div></details>`).join(''));$('#mNo').onclick=closeModal};
  $('#rCnt').onclick=()=>{const exp=num(l.eff)||num(String(c.h.effectif||'').match(/\d+/)),draw=()=>{const C=g.cnt=Array.isArray(g.cnt)?g.cnt:[];
      $('#modal').innerHTML=sheetHTML('Comptage du groupe',`<p>${exp?`Effectif attendu : <b>${exp}</b>`:'Effectif attendu non précisé (renseignez-le sur la ligne ou dans l\'en-tête).'}</p>
        <div class="f"><label for="cN">Personnes comptées maintenant</label><input id="cN" type="number" inputmode="numeric" min="0"></div>
        <div class="row" style="margin-top:10px"><button class="btn grow" id="cOk">Enregistrer ce comptage</button></div>
        ${C.length?`<table class="tb" style="margin-top:12px"><tr><th>Heure</th><th>Compté</th><th></th></tr>${C.map(x=>`<tr><td>${hm(tsMin(x.t))}</td><td>${x.n}</td><td>${exp?(x.n===exp?'✔ complet':x.n<exp?`⚠ il manque ${exp-x.n}`:`+${x.n-exp}`):''}</td></tr>`).join('')}</table>`:''}`);
      $('#mNo').onclick=closeModal;$('#cOk').onclick=()=>{const n=$('#cN').value;if(n==='')return toast('Saisissez le nombre de personnes');C.push({t:Date.now(),n:num(n)});saveItem(true);draw()}};draw()};
  $('#rDoc').onclick=async()=>{const pres=(await live('items')).filter(x=>x.kind==='pre'),allReps=(await live('reps')).map(fixRep);
    const ct=(c.contacts||[]).map(x=>({x,I:contactInfo(x,pres,allReps)})).filter(o=>o.I.nom||o.I.tel).map(({x,I})=>[(x.role?x.role+' : ':'')+I.nom,I.tel,I.mail].filter(Boolean).join('\n')).join('\n\n');
    const docs=L.filter(x=>x.bon||x.conf||x.eff||x.conv||x.lim||x.imp||(x.docs||[]).length).map(x=>bx2(esc(lab(x)+(x.imp&&x.hfix?' — '+hm(t2m(x.hfix))+' impératif':'')),telify([x.conf&&'Confirmation : '+x.conf,x.bon&&'Bon / réservation : '+x.bon,x.eff&&'Effectif attendu : '+x.eff,x.lim&&'Date limite : '+frDate(x.lim),x.conv&&'Convenu : '+x.conv].filter(Boolean).join('\n'))+jusRun(x))).join('');
    $('#modal').innerHTML=sheetHTML('Dossier du jour',bx2('Contacts',telify(ct))+bx2('Urgences',telify(c.h.urgences||'',true),'warn')+(docs||'<p class="mute">Aucun bon ni confirmation saisi dans ce CTI.</p>'));$('#mNo').onclick=closeModal;bindJo($('#modal'))};
  $('#rTel').onclick=async()=>{const d=rep?rep.d:{};
    const pres=(await live('items')).filter(x=>x.kind==='pre'),allReps=(await live('reps')).map(fixRep),ct=(c.contacts||[]).map(x=>{const I=contactInfo(x,pres,allReps);return {x,I}}).filter(o=>o.I.nom||o.I.tel);
    const cts=ct.map(({x,I})=>[(x.role?x.role+' : ':'')+I.nom+(I.det?' ('+I.det+')':''),I.tel,I.mail].filter(Boolean).join('\n')).join('\n\n');
    $('#modal').innerHTML=sheetHTML('Contacts',(bx2('Urgences',telify(c.h.urgences||'',true),'warn')+bx2('Contacts du CTI',telify(cts))+bx2('Contacts de la prestation',telify(c.h.contacts||''))+(rep?bx2(esc(d.site||'Site'),telify([d.contact,d.contact_tel,d.tel&&'Standard : '+d.tel,d.t_resa_ct&&'Réservation : '+d.t_resa_ct].filter(Boolean).join('\n'))):'')
      +bx2('Transport',telify(c.h.transport||''))+bx2('Fin de prestation',esc(c.h.finlieu||'')))||'<p class="mute">Aucun contact saisi dans ce CTI.</p>');$('#mNo').onclick=closeModal};
  if(rep)$('#rFic').onclick=()=>{const d=rep.d,y=k=>[d[k],d[k+'_d']].filter(Boolean).join(' — ');
    const R=[['Rendez-vous du groupe',d.a_rdv],['Dépose autocar',y('a_depose')],['Parking autocars',[y('a_car'),d.a_car_d].filter(Boolean).join(' — ')],['Entrée des groupes',d.a_entree],['À pied depuis la dépose',d.a_pied],['Restrictions d\'accès',d.a_gabarit],
      ['Toilettes',[y('s_wc'),d.s_wc_d].filter(Boolean).join(' — ')],['Accès fauteuil',y('p_acc')],['Cheminement',d.p_chem],['Dernière admission',d.h_dern],['Retrait des billets',d.t_billet],['Points de vigilance',d.x_risq],['Solution de repli',d.x_planb],['Abri',y('s_abri')]].filter(x=>x[1]);
    $('#modal').innerHTML=sheetHTML(d.site||'Fiche de repérage',`<p class="mute">${esc([d.adresse,d.cp,d.ville].filter(Boolean).join(' '))}${rep.gps?` · <a href="${esc(gpsUrl(rep.gps))}" target="_blank" rel="noopener" style="color:var(--pri)">Voir sur la carte</a>`:''}${d.date?'<br>Relevé le '+esc(frDate(d.date))+' : à revérifier si la fiche est ancienne.':''}</p>`
      +(R.map(x=>bx2(x[0],esc(x[1]))).join('')||'<p class="mute">La fiche ne contient pas encore d\'informations pratiques.</p>'));$('#mNo').onclick=closeModal};
  if(v)$('#rVis').onclick=()=>{const mo=l.modCode&&modByCode(v,l.modCode);if(mo){play={seq:[mo],i:0,nom:mo.lieu||mo.code,fs:19,back:['ctiRun',c.id]};return go('visPlay',v.id)}const fo=l.fId&&v.formules.find(f=>f.id===l.fId);if(fo&&fSeq(v,fo).length&&!dupCodes(v).length){play={seq:fSeq(v,fo),i:0,nom:fo.nom||'Formule',fs:19,back:['ctiRun',c.id]};return go('visPlay',v.id)}choosePlay(v,(seq,nom)=>{play={seq,i:0,nom,fs:19,back:['ctiRun',c.id]};go('visPlay',v.id)})};
  $('#rPb').onclick=()=>{const all=[...new Set(L.map(x=>x.visId).filter(Boolean))].map(id=>vis.find(x=>x.id===id)).filter(Boolean),src=v?[v]:all,nx=L.slice(r.i+1).find(x=>x.type!=='trajet'&&x.type!=='fin'&&!obj(r.ov[x.id]).skip);
    $('#modal').innerHTML=sheetHTML('Plan B',bx2('Solution de repli prévue',esc(c.h.meteo||''))+(rep?bx2('Repli noté au repérage',esc(rep.d.x_planb||'')):'')
      +src.map(s=>s.planb.filter(p=>p.sit||p.sol).map(p=>bx2(esc((src.length>1?s.nom+' — ':'')+(p.sit||'Situation')),esc([p.sol,p.duree&&'Durée : '+p.duree].filter(Boolean).join('\n')))).join('')).join('')
      +`<div class="f"><label for="pbWhy">Motif (fermeture, pluie, retard…)</label><input id="pbWhy" placeholder="Site fermé, accès impraticable…"></div>
        <div style="display:grid;gap:10px;margin-top:12px">${l.type!=='pec'?`<button class="btn danger" id="pbCur">Annuler l'étape en cours et ${last?'terminer la prestation':'passer à la suite'}</button>`:''}${nx?`<button class="btn danger" id="pbNx">Annuler : ${esc(lab(nx))}</button>`:''}</div>
        <p class="mute" style="margin-top:10px">Un arrêt annulé libère sa durée : les horaires de la suite sont recalés aussitôt. Pour raccourcir plutôt qu'annuler, utilisez « Adapter la suite ».</p>`);
    $('#mNo').onclick=closeModal;const why=()=>$('#pbWhy').value.trim()||'motif non précisé';
    const cancel=x=>{r.ov[x.id]={...obj(r.ov[x.id]),skip:true};const lg=r.log[x.id]=obj(r.log[x.id]);lg.note=[lg.note,'Étape annulée : '+why()].filter(Boolean).join('\n')};
    if($('#pbCur'))$('#pbCur').onclick=()=>{cancel(l);closeModal();move(1);toast('Étape annulée, suite recalée')};
    if($('#pbNx'))$('#pbNx').onclick=async()=>{cancel(nx);closeModal();await saveItem(true);await VIEWS.ctiRun.r();toast('Arrêt annulé, suite recalée')}};
}};
/* raccourcir ou annuler les étapes à venir, pour ce jour seulement */
function runAdapt(c){
  const r=c.run,L=c.lignes,up=L.slice(r.i).map((l,j)=>({l,cur:!j}));
  const draw=()=>{const k=runCalc(c);
    $('#modal').innerHTML=sheetHTML('Adapter la suite',`<p class="mute">Ces durées ne valent que pour aujourd'hui : le CTI de référence garde les siennes.</p><div class="box${k.lateEnd>=2?' warn':''}" id="adEnd"></div>
      ${k.lateEnd>=2?'<div class="row" style="margin-top:10px"><button class="btn sec sm grow" id="adAuto">Proposer un rattrapage sur les arrêts</button></div>':''}${k.imp.some(x=>x.late>0)?'<div class="row" style="margin-top:10px"><button class="btn sec sm grow" id="adImp">Protéger l\'horaire impératif</button></div>':''}
      ${up.map((x,i)=>{const o=obj(r.ov[x.l.id]);return `<div class="chk" style="align-items:center"><span class="grow" style="min-width:0;font-size:14px${o.skip?';text-decoration:line-through':''}"><b>${esc(lab(x.l))}</b><br><span class="mute">${x.cur?'en cours · ':''}prévu ${num(x.l.duree)} min</span></span>
        <input type="number" inputmode="numeric" min="0" data-d="${i}" value="${esc(blank(o.duree)?'':o.duree)}" placeholder="${num(x.l.duree)}" aria-label="Durée du jour, en minutes" style="width:72px;padding:9px;border:1px solid var(--line);border-radius:10px;background:var(--bg)"${o.skip?' disabled':''}>
        ${x.cur||x.l.type==='fin'?'<span style="width:22px"></span>':`<input type="checkbox" data-s="${i}"${o.skip?' checked':''} aria-label="Annuler cette étape" title="Annuler cette étape">`}</div>`}).join('')}
      <p class="mute" style="margin-top:10px">Case cochée : étape annulée.</p><div class="row" style="margin-top:10px"><button class="btn sec sm grow" id="adZero">Revenir aux durées prévues</button></div>`);
    const end=()=>{const k=runCalc(c),ri=k.imp.filter(x=>x.late>0);const e=$('#adEnd');e.textContent=`Fin prévue ${hm(k.target)} · fin projetée ${hm(k.endProj)} · ${sgn(k.lateEnd).toLowerCase()}`+ri.map(x=>`\n⚠ Impératif : ${lab(x.l)} à ${hm(x.fix)}, ${x.late} min trop tard`).join('');e.style.whiteSpace='pre-wrap';e.classList.toggle('warn',k.lateEnd>=2||ri.length>0)};end();
    $('#mNo').onclick=()=>{closeModal();saveItem(true);VIEWS.ctiRun.r()};
    $$('[data-d]').forEach(e=>e.oninput=()=>{const x=up[+e.dataset.d];r.ov[x.l.id]={...obj(r.ov[x.l.id]),duree:e.value};saveItem();end()});
    $$('[data-s]').forEach(e=>e.onchange=()=>{const x=up[+e.dataset.s];r.ov[x.l.id]={...obj(r.ov[x.l.id]),skip:e.checked};saveItem();draw()});
    $('#adZero').onclick=()=>{up.forEach(x=>delete r.ov[x.l.id]);saveItem();draw()};
    const catchup=(need,upto)=>{   /* on rogne les arrêts à venir, jamais les trajets, de moitié au plus ; upto : indice de la ligne impérative, on ne touche pas aux étapes après elle */
      const S=up.filter((x,i)=>!x.cur&&r.i+i<upto&&x.l.type!=='trajet'&&x.l.type!=='fin'&&!obj(r.ov[x.l.id]).skip&&runEff(r,x.l)>=4),room=S.reduce((a,x)=>a+Math.floor(runEff(r,x.l)/2),0);
      if(!room)return toast('Aucun arrêt à venir ne peut être raccourci : annulez-en un, ou prévenez la suite.',5000);
      const cut=Math.min(need,room);let left=cut;S.forEach((x,i)=>{const cap=Math.floor(runEff(r,x.l)/2),q=i===S.length-1?Math.min(cap,left):Math.min(cap,Math.round(cut*cap/room));left-=q;if(q>0)r.ov[x.l.id]={...obj(r.ov[x.l.id]),duree:String(runEff(r,x.l)-q)}});
      saveItem();draw();toast(cut<need?`Rattrapage partiel : ${cut} min sur ${need}. Vérifiez la proposition.`:`${cut} min rattrapées sur les arrêts. Vérifiez la proposition.`,5000)};
    if($('#adAuto'))$('#adAuto').onclick=()=>catchup(Math.ceil(runCalc(c).lateEnd),1e9);
    if($('#adImp'))$('#adImp').onclick=()=>{const x=runCalc(c).imp.find(y=>y.late>0);if(x)catchup(x.late,x.j)};
  };draw();
}
/* au retour : le prévu et le réel côte à côte, l'utilisateur coche ce qu'il reporte dans la référence */
function runReport(c,rows){
  const C=rows.map(x=>({...x,d:!x.o.skip&&x.reel!==null&&x.l.type!=='pec'&&x.l.type!=='fin'&&Math.abs(x.reel-num(x.l.duree))>=1?x.reel:null,n:(x.g.note||'').trim()||null})).filter(x=>x.d!==null||x.n!==null);
  if(!C.length)return toast('Rien à reporter : les durées réelles correspondent au prévu et aucun constat n\'a été noté.',5000);
  const day=new Date(c.run.t0).toLocaleDateString('fr-FR');
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Reporter dans le CTI"><div class="sheet"><h2>Reporter dans le CTI</h2><p class="mute">Cochez ce qui doit devenir la nouvelle référence. Une durée d'un jour exceptionnel n'a pas à remplacer le prévu.</p>
    ${C.map((x,i)=>`<div style="margin-top:12px"><b>${esc(lab(x.l))}</b>
      ${x.d!==null?`<div class="chk"><input type="checkbox" id="rd${i}"><label for="rd${i}" class="grow">Durée : prévu ${num(x.l.duree)} min → réel <b>${x.d} min</b></label></div>`:''}
      ${x.n!==null?`<div class="chk"><input type="checkbox" id="rn${i}" checked><label for="rn${i}" class="grow">Constat : <span class="mute">${esc(x.n)}</span></label></div>`:''}</div>`).join('')}
    <div class="row" style="margin-top:14px"><button class="btn sec grow" id="mNo">Annuler</button><button class="btn grow" id="mOk">Reporter</button></div></div></div>`;
  $('#mNo').onclick=closeModal;
  $('#mOk').onclick=async()=>{let n=0;C.forEach((x,i)=>{const a=$('#rd'+i),b=$('#rn'+i);
      if(a&&a.checked){if(blank(x.l.prevu))x.l.prevu=String(num(x.l.duree));x.l.duree=String(x.d);x.l.releve=today();n++}
      if(b&&b.checked){const line=`Conduite du ${day} : ${x.n}`;if(!String(x.l.obs||'').includes(line))x.l.obs=[x.l.obs,line].filter(Boolean).join('\n');n++}});
    closeModal();if(!n)return;await saveItem(true);toast(n+' élément(s) reporté(s) dans le CTI');go('cti')};
}
/* ---------- Export Word (.docx) ---------- */
const xe=s=>String(s??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'');
const run=(t,rp='')=>String(t??'').split('\n').map((l,i)=>`<w:r>${rp?`<w:rPr>${rp}</w:rPr>`:''}${i?'<w:br/>':''}<w:t xml:space="preserve">${xe(l)}</w:t></w:r>`).join('');
const para=(t,st,rp)=>`<w:p>${st?`<w:pPr><w:pStyle w:val="${st}"/></w:pPr>`:''}${run(t,rp)}</w:p>`;
const cell=(inner,w,fill)=>`<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${fill?`<w:shd w:val="clear" w:color="auto" w:fill="${fill}"/>`:''}</w:tcPr>${inner}</w:tc>`;
const tbl=(rows,ws,border)=>`<w:tbl><w:tblPr><w:tblW w:w="${ws.reduce((a,b)=>a+b)}" w:type="dxa"/>${border?`<w:tblBorders>${['top','left','bottom','right','insideH','insideV'].map(s=>`<w:${s} w:val="single" w:sz="4" w:space="0" w:color="CFCAC0"/>`).join('')}</w:tblBorders>`:''}<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${ws.map(w=>`<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${rows.map(r=>`<w:tr><w:trPr><w:cantSplit/></w:trPr>${r}</w:tr>`).join('')}</w:tbl>`;
async function toDocx(B,o={}){
  const media=[],W=o.landscape?15138:9638;let body='';
  const pic=f=>{const n=media.push(f),cx=2880000,cy=Math.round(cx*(f.h||3)/(f.w||4));
    return `<w:p><w:pPr><w:spacing w:before="60" w:after="0"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${n}" name="Photo ${n}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="${n}" name="photo${n}.jpg"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rId${n+1}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`+para(capOf(f),'Legende')};
  for(const b of B){
    if(b.h1)body+=para(b.h1,'Title');else if(b.meta)body+=para(b.meta,'Subtitle');else if(b.h2)body+=para(b.h2,'Heading1');else if(b.h3)body+=para(b.h3,'Heading2');
    else if(b.p)body+=para(b.p);else if(b.small)body+=para(b.small,'Legende');
    else if(b.table)body+=tbl(b.table.map(([l,v])=>cell(para(l,null,'<w:b/>'),3300,'F4F6F7')+cell(para(v),W-3300)),[3300,W-3300],true)+'<w:p/>';
    else if(b.grid){const g=b.grid,k=W/g.w.reduce((a,x)=>a+x),ws=g.w.map(x=>Math.round(x*k)),sz='<w:sz w:val="17"/><w:szCs w:val="17"/>',tx=c=>c&&typeof c==='object'?c.t:c;
      body+=tbl([g.head.map((h,i)=>cell(para(h,null,'<w:b/><w:color w:val="FFFFFF"/>'+sz),ws[i],'0A3A5C')).join(''),...g.rows.map(r=>r.map((c,i)=>cell(para(tx(c),null,(c&&c.b?'<w:b/>':'')+sz),ws[i],c&&c.fill)).join(''))],ws,true)+'<w:p/>'}
    else if(b.pics){const rows=[];for(let i=0;i<b.pics.length;i+=2)rows.push(cell(pic(b.pics[i]),4819)+cell(b.pics[i+1]?pic(b.pics[i+1]):'<w:p/>',4819));body+=tbl(rows,[4819,4819],false)+'<w:p/>'}}
  const NS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
  const X='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n',st=(id,name,pp,rp,base='Normal')=>`<w:style w:type="paragraph" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="${base}"/><w:next w:val="Normal"/><w:qFormat/><w:pPr>${pp}</w:pPr><w:rPr>${rp}</w:rPr></w:style>`;
  const F={
   '[Content_Types].xml':X+'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>',
   '_rels/.rels':X+'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
   'word/document.xml':X+`<w:document ${NS}><w:body>${body}<w:sectPr>${o.landscape?'<w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar w:top="850" w:right="850" w:bottom="850" w:left="850"':'<w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"'} w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`,
   'word/styles.xml':X+`<w:styles ${NS}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="fr-FR"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="60"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>`
    +st('Title','Title','<w:spacing w:after="40"/>','<w:b/><w:color w:val="0A3A5C"/><w:sz w:val="44"/><w:szCs w:val="44"/>')
    +st('Subtitle','Subtitle','<w:spacing w:after="240"/>','<w:color w:val="63747B"/><w:sz w:val="20"/>')
    +st('Heading1','heading 1','<w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="2" w:color="E8801A"/></w:pBdr><w:spacing w:before="320" w:after="120"/><w:outlineLvl w:val="0"/>','<w:b/><w:color w:val="0A3A5C"/><w:sz w:val="26"/><w:szCs w:val="26"/>')
    +st('Heading2','heading 2','<w:keepNext/><w:spacing w:before="200" w:after="60"/><w:outlineLvl w:val="1"/>','<w:b/><w:sz w:val="22"/><w:szCs w:val="22"/>')
    +st('Legende','Légende','<w:spacing w:after="80"/>','<w:color w:val="63747B"/><w:sz w:val="17"/><w:szCs w:val="17"/>')+'</w:styles>',
   'word/_rels/document.xml.rels':X+`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>${media.map((f,i)=>`<Relationship Id="rId${i+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/photo${i+1}.jpg"/>`).join('')}</Relationships>`};
  const enc=new TextEncoder(),E=Object.entries(F).map(([n,s])=>[n,enc.encode(s)]);
  for(let i=0;i<media.length;i++)E.push([`word/media/photo${i+1}.jpg`,new Uint8Array(await media[i].blob.arrayBuffer())]);
  return zip(E,'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
}

/* ---------- Sauvegarde et import ---------- */
const b64=blob=>new Promise((ok,ko)=>{const r=new FileReader();r.onload=()=>ok(r.result.slice(r.result.indexOf(',')+1));r.onerror=()=>ko(r.error);r.readAsDataURL(blob)});
function unb64(s,type){if(typeof s!=='string'||s.length%4||!/^[A-Za-z0-9+/]*={0,2}$/.test(s))throw new Error('une pièce jointe du fichier est endommagée');
  const bin=atob(s),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new Blob([u],{type})}
async function backup(reps,name,items=[],rescue){   /* rescue : mise à l'abri d'une saisie que l'appareil refuse d'enregistrer — on n'attend pas l'écriture */
  toast('Préparation de la sauvegarde…',8000);if(!rescue)await flushAll();
  try{const parts=['{"app":"reperage-guide","v":2,"date":"'+new Date().toISOString()+'","profil":'+JSON.stringify(profil)+',"reps":['];let nf=0;
    for(let i=0;i<reps.length;i++){const fl=await DB.filesOf(reps[i].id),out=[];
      for(const f of fl){const {blob,...m}=f;out.push({...m,data:await b64(blob)});nf++}
      parts.push((i?',':'')+JSON.stringify({rep:reps[i],files:out}))}
    const ifl=[];for(const it of items){if(it.kind!=='cti')continue;for(const f of await DB.filesOf(it.id)){const {blob,...m}=f;ifl.push({...m,data:await b64(blob)});nf++}}
    parts.push('],"items":'+JSON.stringify(items)+',"ifiles":'+JSON.stringify(ifl)+'}');
    const blob=new Blob(parts,{type:'application/json'});
    if(await deliver(blob,name)){if(!rescue)await DB.put('kv',{t:Date.now(),reps:reps.length,items:items.length,files:nf,size:blob.size},'lastBackup');bkRefresh();toast('Sauvegarde remise : '+name,4000)}
    else toast('Sauvegarde annulée : aucun fichier n\'a été remis',4000)}
  catch(e){toast('Sauvegarde impossible : '+((e&&e.message)||'mémoire insuffisante ? Sauvegardez les repérages un par un.'),7000)}
}
/* Import d'une sauvegarde, en trois temps : 1. tout vérifier et décoder en mémoire, sans rien écrire ;
   2. annoncer ce qui sera remplacé ; 3. écrire en une seule transaction — tout passe, ou rien ne change. */
async function importBackup(j){
  const R=[],I=[];
  for(const e of arr(j.reps)){const r0=obj(obj(e).rep);if(!okId(r0.id))throw new Error('sauvegarde invalide (identifiant de fiche incorrect) : rien n\'a été modifié');
    const rep=fixRep(r0),fl=arr(e.files).map(f=>{f=obj(f);if(!okId(f.id))throw new Error('sauvegarde invalide (identifiant de pièce incorrect) : rien n\'a été modifié');
      const kind=f.kind==='doc'?'doc':'photo',type=safeType(f.type,kind),{data,...m}=f;
      return {...m,repId:rep.id,kind,type,name:String(m.name||(kind==='doc'?'document':'photo')),pointId:okId(m.pointId)?m.pointId:'',rpgId:okId(m.rpgId)?m.rpgId:undefined,cap:String(m.cap||''),gps:gpsOK(m.gps),t:+m.t||Date.now(),w:+m.w||0,h:+m.h||0,blob:unb64(data,type)}});
    summary(rep,fl);R.push({rep,fl})}
  for(const it of arr(j.items)){if(!okId(obj(it).id)||!KINDS[it.kind])throw new Error('sauvegarde invalide (élément inconnu) : rien n\'a été modifié');I.push(fixItem(it))}
  /* Collisions : si une pièce du fichier porte l'identifiant d'une pièce d'une AUTRE fiche (sur l'appareil ou dans le fichier),
     elle reçoit un nouvel identifiant. La pièce d'origine n'est ni déplacée ni écrasée. Même règle pour CTI, visites et budgets. */
  const IF=arr(j.ifiles).map(f=>{f=obj(f);if(!okId(f.id)||!okId(f.repId))throw new Error('sauvegarde invalide (justificatif incorrect) : rien n\'a été modifié');const type=safeType(f.type,'doc'),{data,...m}=f;
    return {...m,kind:'doc',type,name:String(m.name||'justificatif'),t:+m.t||Date.now(),blob:unb64(data,type)}}),idMap=new Map();
  const seenF=new Set(),seenI=new Set(),seenR=new Set();
  for(const x of R){if(seenR.has(x.rep.id))throw new Error('sauvegarde invalide (la même fiche y figure deux fois) : rien n\'a été modifié');seenR.add(x.rep.id);
    for(const f of x.fl){const ex=await DB.get('files',f.id);if(seenF.has(f.id)||(ex&&ex.repId!==x.rep.id))f.id=uid();seenF.add(f.id)}
    delete x.rep.np;summary(x.rep,x.fl)}
  for(const it of I){const oid=it.id,ex=await DB.get('items',it.id);if(seenI.has(it.id)||(ex&&ex.kind!==it.kind))it.id=uid();seenI.add(it.id);idMap.set(oid,it.id)}
  const plan={neuf:0,remp:[],skip:0,ops:[]};
  for(const x of R){const old=await DB.get('reps',x.rep.id);
    if(old&&!old.deleted&&old.updated>=x.rep.updated){plan.skip++;continue}
    delete x.rep.deleted;x.old=old?(await DB.filesOf(x.rep.id)).map(f=>f.id):[];
    if(old&&!old.deleted)plan.remp.push('Lieu : '+(obj(old.d).site||'sans nom'));else plan.neuf++;plan.ops.push(x)}
  const its=[];for(const it of I){const old=await DB.get('items',it.id);
    if(old&&!old.deleted&&old.updated>=it.updated){plan.skip++;continue}
    delete it.deleted;if(old&&!old.deleted)plan.remp.push(KINDS[it.kind].one.replace(/^./,c=>c.toUpperCase())+' : '+KINDS[it.kind].title(fixItem(old)));else plan.neuf++;its.push(it)}
  const itF=[];for(const it of its){itF.push({old:j.ifiles?(await DB.filesOf(it.id)).map(f=>f.id):[],fl:IF.filter(f=>idMap.get(f.repId)===it.id).map(f=>({...f,repId:it.id}))})}
  const apply=async()=>{
    try{await txm(['reps','files','items'],S=>{
      for(const x of itF){for(const id of x.old)S('files').delete(id);for(const f of x.fl)S('files').put(f)}
      for(const x of plan.ops){for(const id of x.old)S('files').delete(id);S('reps').put(x.rep);for(const f of x.fl)S('files').put(f)}
      for(const it of its)S('items').put(it)})}
    catch(e){return toast('Import interrompu, rien n\'a été modifié : '+((e&&e.message)||'espace insuffisant ?'),7000)}
    if(j.profil&&!profil.nom&&!profil.prenom&&typeof j.profil==='object'){profil=Object.fromEntries(PROFIL.map(f=>[f[0],String(obj(j.profil)[f[0]]||'')]));await DB.put('kv',profil,'profil')}
    const n=plan.ops.length+its.length;
    toast((n?`${n} élément${n>1?'s':''} importé${n>1?'s':''}`:'Rien à importer')+(plan.skip?` · ${plan.skip} ignoré${plan.skip>1?'s':''} : version identique ou plus récente déjà sur cet appareil`:''),6000);
    go(view&&VIEWS[view].top?view:'list')};
  if(!plan.remp.length)return apply();
  confirmBox('Remplacer '+plan.remp.length+' élément'+(plan.remp.length>1?'s':'')+' de cet appareil ?',
    'Le fichier contient une version plus récente de :\n• '+plan.remp.slice(0,12).join('\n• ')+(plan.remp.length>12?'\n• …':'')+'\n\nLa version présente sur cet appareil sera remplacée, photos et documents compris.'+(plan.neuf?`\n${plan.neuf} autre(s) élément(s) seront simplement ajoutés.`:''),'Remplacer',apply);
}
$('#fImp').onchange=async e=>{const file=e.target.files[0];if(!file)return;closeModal();
  try{await importAny(await file.text())}catch(x){toast('Import impossible : '+((x&&x.message)||'fichier illisible'),7000)}};

/* ---------- Corbeille : 30 jours pour se raviser ---------- */
const TRASH_DAYS=30;
async function purgeItem(i){for(const f of await DB.filesOf(i.id))await DB.del('files',f.id);await DB.del('items',i.id)}
async function purge(r){for(const f of await DB.filesOf(r.id))await DB.del('files',f.id);await DB.del('reps',r.id)}
async function trashList(){return [...(await DB.all('reps')).filter(r=>r.deleted).map(r=>({st:'reps',o:r,label:'Lieu : '+(obj(r.d).site||'sans nom')})),
  ...(await DB.all('items')).filter(i=>i.deleted&&KINDS[i.kind]).map(i=>({st:'items',o:fixItem(i),label:KINDS[i.kind].one.replace(/^./,c=>c.toUpperCase())+' : '+KINDS[i.kind].title(i)}))].sort((a,b)=>b.o.deleted-a.o.deleted)}
async function trashSheet(){
  const L=await trashList();
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Corbeille"><div class="sheet"><h2>Corbeille</h2><p class="mute">Les éléments supprimés restent ici ${TRASH_DAYS} jours, puis sont effacés définitivement.</p>
   ${L.length?L.map((x,i)=>`<div class="doc"><span class="grow" style="min-width:0"><b>${esc(x.label)}</b><br><span class="mute">supprimé le ${new Date(x.o.deleted).toLocaleDateString('fr-FR')}</span></span><button class="btn sec sm" data-r="${i}">Restaurer</button><button class="mini" data-d="${i}" aria-label="Effacer définitivement">🗑</button></div>`).join(''):'<p class="mute">La corbeille est vide.</p>'}
   <div class="row" style="margin-top:12px"><button class="btn grow" id="mNo">Fermer</button></div></div></div>`;
  $('#mNo').onclick=closeModal;
  $$('[data-r]').forEach(b=>b.onclick=async()=>{const x=L[+b.dataset.r];delete x.o.deleted;x.o.updated=Date.now();await DB.put(x.st,x.o);toast('Restauré');await trashSheet();if(VIEWS[view].top)VIEWS[view].r()});
  $$('[data-d]').forEach(b=>b.onclick=()=>{const x=L[+b.dataset.d];confirmBox('Effacer définitivement ?',x.label+'\nCette fois, il n\'y aura pas de retour possible.','Effacer',async()=>{x.st==='reps'?await purge(x.o):(await purgeItem(x.o));trashSheet()})});
}

/* ---------- Menu ---------- */
async function doBackup(){closeModal();backup(await live('reps'),'tiango_'+today()+'.tiango.json',await live('items'))}
$('#bBk').onclick=doBackup;
$('#bMenu').onclick=async()=>{
  const lb=await DB.get('kv','lastBackup'),n=(await live('reps')).length+(await live('items')).length,nt=(await trashList()).length;
  let use='',pers=null,off=false;
  try{const e=await navigator.storage.estimate();use=`Espace utilisé : ${human(e.usage||0)}`+(e.quota?` sur ${human(e.quota)} disponibles`:'')+'.'}catch(x){}
  try{pers=await navigator.storage.persisted()}catch(x){}
  try{off=!!(navigator.serviceWorker&&navigator.serviceWorker.controller)&&!!(await caches.match('./'))}catch(x){}
  const lbt=lb?(typeof lb==='object'?lb.t:lb):0,old=lbt&&Date.now()-lbt>7*864e5;
  $('#modal').innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Menu"><div class="sheet"><picture><source srcset="logo-dark.png" media="(prefers-color-scheme:dark)"><img class="brand" src="logo.png" alt="Tiango" style="width:220px;padding:6px 12px"></picture>
   <div style="display:grid;gap:10px;margin-top:12px">
   <button class="btn sec" id="m1">👤 Mon profil</button>
   <button class="btn sec" id="m2">💾 Sauvegarder toutes mes données</button>
   <button class="btn sec" id="m3">📥 Importer (sauvegarde, site à visiter ou CTI)</button>
   <button class="btn sec" id="m7">🔑 Licence${LIC.state==='valide'?' : '+esc(LIC.nom):' (démonstration)'}</button>
   <button class="btn sec" id="m8">🎙️ Discours de visite (tous)</button>
   <button class="btn sec" id="m4"${n>1?'':' disabled'}>🧭 Synthèse des sites</button>
   <button class="btn sec" id="m5">🗑 Corbeille${nt?' ('+nt+')':''}</button></div>
   <div class="box${!lbt&&n||old?' warn':''}" style="margin-top:14px">${lbt?`Dernière sauvegarde : ${new Date(lbt).toLocaleDateString('fr-FR')}${typeof lb==='object'?` (${lb.reps} sites, ${lb.items} circuits, CTI, repérages, visites, budgets et prestataires, ${lb.files} photos et documents, ${human(lb.size)})`:''}.${old?' Elle a plus d\'une semaine.':''}`:n?'Aucune sauvegarde effectuée : vos données n\'existent que sur cet appareil.':'Aucune donnée à sauvegarder pour l\'instant.'}</div>
   <div class="box">${off?'✅ Prête hors connexion : l\'application est enregistrée dans cet appareil.':'⚠️ Pas encore disponible hors connexion sur cet appareil (première ouverture, ou navigateur qui ne le permet pas).'}<br>
     ${pers===true?'✅ Stockage protégé : le navigateur ne supprimera pas vos données de lui-même.':pers===false?'⚠️ Stockage non protégé : le navigateur peut effacer les données d\'un site peu utilisé. Installez Tiango sur l\'écran d\'accueil et sauvegardez régulièrement.':'Protection du stockage : inconnue sur ce navigateur.'}<br>${use}</div>
   <p class="mute"><b>Vos données restent dans cet appareil</b>, sans compte ni serveur. Pour les retrouver ailleurs : sauvegardez ici, transmettez le fichier (AirDrop, iCloud, e-mail), puis importez-le là-bas. Le fichier de sauvegarde n'est pas chiffré : il contient vos coordonnées, vos contacts, les positions et les pièces jointes. Ne l'envoyez qu'à des personnes de confiance.</p>
   <p class="mute"><b>Sur iPhone et iPad</b>, ajoutez l'application à l'écran d'accueil (bouton Partager de Safari, puis « Sur l'écran d'accueil »).</p>
   <div class="row" style="margin-top:10px"><button class="btn grow" id="mNo">Fermer</button></div></div></div>`;
  imgGuard();
  $('#mNo').onclick=closeModal;$('#m1').onclick=editProfil;
  $('#m2').onclick=doBackup;
  $('#m3').onclick=()=>importSheet();
  $('#m4').onclick=()=>{closeModal();go('syn')};$('#m7').onclick=()=>licSheet();$('#m8').onclick=()=>{closeModal();go('visList')};
  $('#m5').onclick=()=>trashSheet();
};

/* ---------- Démarrage ---------- */
(async()=>{
  try{profil=obj(await DB.get('kv','profil'))}catch(e){$('#main').innerHTML='<div class="empty"><b>Stockage indisponible</b>Ce navigateur bloque l\'enregistrement local (navigation privée ?). Ouvrez l\'application dans une fenêtre normale.</div>';return}
  try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
  if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('sw.js').catch(()=>{});
  /* ne rien laisser en attente : à la perte de focus d'un champ, au passage en arrière-plan, à la fermeture */
  addEventListener('pagehide',()=>{flushAll()});document.addEventListener('visibilitychange',()=>{if(document.hidden)flushAll()});document.addEventListener('focusout',()=>{if(!$('#modal [role="alertdialog"]'))flushAll()});
  addEventListener('beforeunload',e=>{if(dirty||idirty||pend){flushAll();e.preventDefault();e.returnValue=''}});
  /* deux onglets ouverts sur les mêmes données peuvent s'écraser l'un l'autre : prévenir */
  try{const bc=new BroadcastChannel('tiango');bc.onmessage=m=>{if(m.data==='hello'){bc.postMessage('here');toast('Tiango vient d\'être ouvert dans un autre onglet. N\'en gardez qu\'un pour éviter d\'écraser vos saisies.',9000)}
    if(m.data==='here')toast('Tiango est déjà ouvert dans un autre onglet. Fermez-en un pour éviter d\'écraser vos saisies.',9000)};bc.postMessage('hello')}catch(e){}
  /* vidage automatique de la corbeille après 30 jours */
  try{const lim=Date.now()-TRASH_DAYS*864e5;for(const r of await DB.all('reps'))if(r.deleted&&r.deleted<lim)await purge(r);for(const i of await DB.all('items'))if(i.deleted&&i.deleted<lim)await purgeItem(i)}catch(e){}
  await licInit();await profilSync();mark('ok');bkRefresh();go('list');
})();
