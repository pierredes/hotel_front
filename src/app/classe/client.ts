export class Client {
    public id : number | undefined;
    public nomComplet : string | undefined;
    public telephone : string | undefined;
    public email : string | undefined;
    public adresse : string | undefined;

    constructor(id? : number | undefined, nomComplet? : string | undefined, telephone? : string | undefined, email? : string | undefined, adresse? : string | undefined) {
        this.id = id;
        this.nomComplet = nomComplet;
        this.telephone = telephone;
        this.email = email;
        this.adresse = adresse;
    }
}
