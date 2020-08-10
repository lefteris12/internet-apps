# 🏖️ Greek Beaches 

## Περιγραφή

**Τελική εργασία του μαθήματος Διαδίκτυο και Εφαρμογές 2019-2020**

Δικτυακή εφαρμογή η οποία βοηθάει τους χρήστες να βρουν ελληνικές παραλίες κατάλληλες για κολύμβηση κοντά τους.
Υπάρχει επίσης ένδειξη του καιρού στην συγκεκριμένη παραλία.

Συγκεκριμένα, τα δεδομένα για τις παραλίες αντλούνται από [dataset](https://geodata.gov.gr/en/dataset/poioteta-udaton-akton-kolumbeses-2015) της ιστοσελίδας Geodata.gov.gr σχετικά με την Ποιότητα υδάτων ακτών κολύμβησης το 2015.
Υπάρχουν πληροφορίες για 1508 σημεία κολύμβησης εκ των οποίων κατηγοροποιούνται ως *Εξαιρετικής ποιότητας* 1499 και ως *Καλής ποιότητας* 9. Περαιτέρω πληροφορίες στην [σχετική έκθεση](http://geodata.gov.gr/dataset/fe02780f-8f02-4ffb-ba08-1f6c8532227c/resource/576b8633-6893-4bd0-bac4-b2889a42a371/download/report2015el.pdf).
Τα δεδομένα για τον καιρό αντλούνται από το [Open Weather API](https://openweathermap.org/api).

## Υλοποίηση

- Βάση Δεδόμενων: PostgreSQL
- Backend: API endpoints μέσω Java (με το framework Spring)
- Frontend: HTML/CSS/JavaScript στο οποίο δίνεται η τοποθεσία από τον χρήστη και εμφανίζονται παραλίες κοντά του. Εμφανίζονται πληροφορίες όπως την ποιότητα των υδάτων σύμφωνα με τις μετρήσεις, τα μποφόρ στην παραλία (που δείχνουν αν ο καιρός είναι κατάλληλος για κολύμβηση) και η τοποθεσία στο χάρτη των παραλιών.

## Εγκατάσταση σε Ubuntu

### Εγκατάσταση PostgreSQL

```
sudo apt update
sudo apt install postgresql postgresql-contrib
```
Η βάση δεδομένων έχει όνομα `internet-apps`.
Για την πρόσβαση χρησιμοποιείται ο προεπιλεγμένος χρήστης `postgres` με κωδικό `postgres`.
Για να οριστεί αυτός ο κωδικός για το χρήστη `postgres` και να δημιουργηθεί η βάση:

```
sudo -u postgres psql
ALTER USER postgres PASSWORD 'postgres';
CREATE DATABASE "internet-apps";
```

### Εγκατάσταση πακέτων Python

Για τη λειτουργία του script `import-excel.py` που εισάγει τα δεδομένα στη βάση πρέπει να εγκατασταθούν κάποια Python πακέτα:

```
pip3 install psycopg2 xlrd pandas
```

Στη συνέχεια μπορεί να εκτελεστεί το script για να αρχικοποιηθεί η βάση:

```
python3 import-excel.py
```

### Εκκίνηση του server

Εγκατάσταση Java:

```
sudo apt update
sudo apt install default-jdk

```
Εκκίνηση server:
```
cd backend
./mvnw spring-boot:run
```

Το web app είναι διαθέσιμο στο http://localhost:8080

## Author
Λευτέρης Καπελώνης
