<template>
<div class="row">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title mb-4">Ajouter un nouveau contact</h4>
            <hr>
            <div v-if="!submitted">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="nom">Nom</label>
                            <input type="text" class="form-control" id="nom" required v-model="contact.nom" name="nom" placeholder="Votre nom" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="prenoms">Prénoms</label>
                            <input class="form-control" id="prenoms" type="text" required v-model="contact.prenoms" name="prenoms" placeholder="Votre prénoms" />
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="telephone">Téléphone</label>
                            <input type="tel" class="form-control" id="telephone" required v-model="contact.telephone" name="telephone" placeholder="Votre téléphone" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="email">Adresse mail</label>
                            <input class="form-control" type="email" id="email" required v-model="contact.email" name="email" placeholder="Votre adresse mail" />
                        </div>
                    </div>
                </div>

                <div class="text-center mt-3">
                    <button @click="saveContact" class="btn btn-success py-1 px-5">VALIDER</button>
                </div>

            </div>

            <div v-else class="alert alert-success">
                <h4>Nouveau contact ajouté avec succès</h4>
                <button class="btn btn-success" @click="newContact">Ajouter un nouveau</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ContactDataService from "../services/ContactDataService";

export default {
    name: "add-contact",
    data() {
        return {
            contact: {
                id: null,
                nom: "",
                prenoms: "",
                email: "",
                telephone: "",
            },
            submitted: false
        };
    },
    methods: {
        saveContact() {
            var data = {
                nom: this.contact.nom,
                prenoms: this.contact.prenoms,
                telephone: this.contact.telephone,
                email: this.contact.email
            };

            ContactDataService.create(data)
                .then(response => {
                    this.contact.id = response.data.id;
                    //console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
            this.submitted = true;
        },

        newContact() {
            this.submitted = false;
            this.contact = {};
        }
    },
    mounted() {},
    compatConfig: {
        MODE: 3
    },
};
</script>
