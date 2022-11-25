<template>
<nav class="navbar navbar-expand-lg bg-dark text-uppercase fixed-top" id="mainNav">
    <div class="container">
        <router-link to="/" class="navbar-brand">Gestion des candidats</router-link>
        <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item mx-0 mx-lg-1">
                    <router-link to="/add-contact" class="btn btn-light rounded">Ajouter <i class="fa fa-plus-circle"></i></router-link>
                </li>
                <li class="nav-item mx-0 mx-lg-1">
                    <router-link to="/" class="btn btn-info rounded text-white">Liste des contacts <i class="fa fa-eye"></i></router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="container" style="margin-top:150px">
    <router-view />
</div>
</template>

<script>
export default {
    name: "app"
};
</script>
