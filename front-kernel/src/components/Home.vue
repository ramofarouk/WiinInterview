<script>
import ContactDataService from "../services/ContactDataService";
export default {
    name: "home",
    data() {
        return {
            contacts: [],
            OpenClose: false,
            isDeleted: false,
            OpenClose2: false,
            isDeleted2: false,
            name: "",
            contact: {},
            selections: [],
            isContain: false
        };
    },
    methods: {
        retrieveContacts() {
            ContactDataService.getAll()
                .then(response => {
                    this.contacts = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        OpenCloseFun() {
            this.OpenClose = false;
        },
        OpenCloseFun2() {
            this.OpenClose2 = false;
        },
        showPopupDelete(contact) {
            this.OpenClose = true;
            this.contact = contact;
        },
        showPopupDelete2() {
            this.OpenClose2 = true;
        },
        deleteCandidat(id) {
            ContactDataService.delete(id)
                .then(response => {
                    console.log(response.data);
                    this.isDeleted = true;
                    this.retrieveContacts();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        searchByLastName() {
            ContactDataService.findByLastName(this.nom)
                .then(response => {
                    this.contacts = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        changeSelection(id) {
            this.isContain = false;
            if (!this.selections.includes(id)) {
                this.selections.push(id);
            } else {
                const index = this.selections.indexOf(id);
                if (index > -1) {
                    this.selections.splice(index, 1);
                }
            }
            if (this.selections.length > 0) {
                this.isContain = true;
            }
        },
        deleteSelection() {
            ContactDataService.deleteMany(this.selections)
                .then(response => {
                    console.log(response.data);
                    this.isContain = false;
            this.selections = [];
            this.isDeleted2 = true;
            this.retrieveContacts();
                })
                .catch(e => {
                    console.log(e);
                });

           

        },

    },
    mounted() {
        this.retrieveContacts();
    },
};
</script>

<template>
<div class="row">
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4">
                    <h4 class="card-title mb-4">Liste des contacts</h4>
                </div>
                <div class="col-lg-4 offset-4 text-end">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" @keyup="searchByLastName" placeholder="Rechercher par nom" v-model="nom" />
                    </div>
                </div>
            </div>
            <hr>
            <div class="row" v-if="isContain">
                <div class="col-lg-12">
                    <div class="input-group mb-3">
                        <button class="btn btn-danger" @click="showPopupDelete2()">Supprimer la sélection <i class="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-dark table-striped rounded">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nom</th>
                            <th>Prénoms</th>
                            <th>Numéro de téléphone</th>
                            <th>Adresse mail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="contact in contacts" :key="contact.id">
                            <td><input type="checkbox" @change="changeSelection(contact.id)" /></td>
                            <td>{{ contact.nom }}</td>
                            <td>{{ contact.prenoms }}</td>
                            <td>{{ contact.telephone }}</td>
                            <td>{{ contact.email }}</td>
                            <td>
                                <button class="btn btn-danger" @click="showPopupDelete(contact)">Supprimer <i class="fa fa-trash"></i></button>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
<div v-if="OpenClose" class="modal fade show opened" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" style="text-align: center">Suppression d'un contact</h4>
                <button type="button" @click="OpenCloseFun()" class="btn-close"></button>
            </div>
            <div class="modal-body">
                <p v-if="isDeleted">
                    contact <b>{{ contact.nom + " " + contact.prenoms }}</b> supprimé avec succès!
                </p>
                <p v-else>
                    Etes-vous sûr de supprimer le contact <b>{{ contact.nom + " " + contact.prenoms }}</b> ?
                </p>

            </div>
            <div class="modal-footer">
                <button v-if="!isDeleted" type="submit" class="btn btn-success" @click="deleteCandidat(contact.id)">Supprimer</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="OpenCloseFun()">Fermer</button>
            </div>
        </div>
    </div>
</div>
<div v-if="OpenClose2" class="modal fade show opened" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" style="text-align: center">Suppression de la selection</h4>
                <button type="button" @click="OpenCloseFun2()" class="btn-close"></button>
            </div>
            <div class="modal-body">
                <p v-if="isDeleted2">
                    Sélection de contact supprimée avec succès!
                </p>
                <p v-else>
                    Etes-vous sûr de supprimer cette sélection ?
                </p>

            </div>
            <div class="modal-footer">
                <button v-if="!isDeleted2" type="submit" class="btn btn-success" @click="deleteSelection()">Supprimer</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="OpenCloseFun2()">Fermer</button>
            </div>
        </div>
    </div>
</div>
</template>
