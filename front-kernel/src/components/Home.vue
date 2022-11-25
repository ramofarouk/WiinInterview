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
            OpenClose3: false,
            isUpdated: false,
            name: "",
            contact: {},
            contact2: {
                id: null,
                nom: "",
                prenoms: "",
                email: "",
                telephone: "",
            },
            selections: [],
            errorText: "",
            isError: false,
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
        OpenClosePopup() {
            this.OpenClose = false;
        },
        OpenClosePopup2() {
            this.OpenClose2 = false;
        },
        OpenClosePopup3() {
            this.OpenClose3 = false;
        },
        showPopupDelete(contact) {
            this.OpenClose = true;
            this.contact = contact;
        },
        showPopupEdit(contact) {
            this.isUpdated = false;
            this.OpenClose3 = true;
            this.contact2 = contact;
        },
        showPopupDelete2() {
            this.OpenClose2 = true;
        },
        updateCandidat() {
            this.errorText = "";
            this.isError = false;
            if (this.contact2.nom.length == 0 || this.contact2.nom == "") {
                this.isError = true;
                this.errorText += "Veuillez renseigner votre nom<br>"
            }
            if (this.contact2.prenoms.length == 0 || this.contact2.prenoms == "") {
                this.isError = true;
                this.errorText += "Veuillez renseigner votre prenoms<br>"
            }
            if (this.contact2.telephone.length == 0 || this.contact2.telephone == "") {
                this.isError = true;
                this.errorText += "Veuillez renseigner votre numéro téléphone<br>"
            } else if (this.contact2.telephone.length < 11 || this.contact2.telephone.length > 11) {
                this.isError = true;
                this.errorText += "Veuillez renseigner un numéro de téléphone valide<br>"
            }
            if (this.contact2.email.length == 0 || this.contact2.email == "") {
                this.isError = true;
                this.errorText += "Veuillez renseigner votre adresse mail<br>"
            } else if (!this.contact2.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                this.isError = true;
                this.errorText += "Veuillez renseigner une adresse mail valide<br>"
            }
            if (!this.isError) {
            var data = {
                nom: this.contact2.nom,
                prenoms: this.contact2.prenoms,
                telephone: this.contact2.telephone,
                email: this.contact2.email
            };

            ContactDataService.update(this.contact2.id, data)
                .then(response => {
                    console.log(response.data);
                    this.isUpdated = true;
                    this.retrieveContacts();
                })
                .catch(e => {
                    console.log(e);
                });
            }
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
                                <button class="btn btn-primary text-white me-2" @click="showPopupEdit(contact)">Modifier <i class="fa fa-edit"></i></button>
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
                <button type="button" @click="OpenClosePopup()" class="btn-close"></button>
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
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="OpenClosePopup()">Fermer</button>
            </div>
        </div>
    </div>
</div>
<div v-if="OpenClose2" class="modal fade show opened" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" style="text-align: center">Suppression de la selection</h4>
                <button type="button" @click="OpenClosePopup2()" class="btn-close"></button>
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
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="OpenClosePopup2()">Fermer</button>
            </div>
        </div>
    </div>
</div>
<div v-if="OpenClose3" class="modal fade show opened" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display:block">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" style="text-align: center">Mise à jour d'un contact</h4>
                <button type="button" @click="OpenClosePopup3()" class="btn-close"></button>
            </div>
            <div class="modal-body text-start" style="width:100%">
                <div v-if="isUpdated" class="alert alert-success">
                    <h5>Informations du contact mises à jour</h5>
                </div>
                <div v-if="isError" class="alert alert-danger">
                    <p v-html="errorText"></p>
                </div>
                <div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="nom">Nom</label>
                                <input type="text" class="form-control w-100" id="nom" required v-model="contact2.nom" name="nom" placeholder="Votre nom" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="prenoms">Prénoms</label>
                                <input class="form-control w-100" id="prenoms" type="text" required v-model="contact2.prenoms" name="prenoms" placeholder="Votre prénoms" />
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="telephone">Téléphone(Avec indicatif)</label>
                                <input type="tel" class="form-control w-100" id="telephone" required v-model="contact2.telephone" name="telephone" placeholder="Votre téléphone (Ex:33061091209)" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label for="email">Adresse mail</label>
                                <input class="form-control w-100" type="email" id="email" required v-model="contact2.email" name="email" placeholder="Votre adresse mail (Ex: john@kernel.com)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button v-if="!isUpdated" type="submit" class="btn btn-success" @click="updateCandidat()">Mettre à jour</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="OpenClosePopup3()">Fermer</button>
            </div>
        </div>
    </div>
</div>
</template>
