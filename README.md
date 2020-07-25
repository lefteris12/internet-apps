# 🏖️ Greek Beaches 

**Τελική εργασία του μαθήματος Διαδίκτυο και Εφαρμογές 2019-2020**

Δικτυακή εφαρμογή η οποία βοηθάει τους χρήστες να βρουν ελληνικές παραλίες κατάλληλες για κολύμβηση κοντά τους.
Υπάρχει επίσης ένδειξη του καιρού στην συγκεκριμένη παραλία.

Συγκεκριμένα, τα δεδομένα για τις παραλίες αντλούνται από [dataset](https://geodata.gov.gr/en/dataset/poioteta-udaton-akton-kolumbeses-2015) της ιστοσελίδας Geodata.gov.gr σχετικά με την Ποιότητα υδάτων ακτών κολύμβησης το 2015.
Υπάρχουν πληροφορίες για 1508 σημεία κολύμβησης εκ των οποίων κατηγοροποιούνται ως *Εξαιρετικής ποιότητας* 1499 και ως *Καλής ποιότητας* 9. Περαιτέρω πληροφορίες στην [σχετική έκθεση](http://geodata.gov.gr/dataset/fe02780f-8f02-4ffb-ba08-1f6c8532227c/resource/576b8633-6893-4bd0-bac4-b2889a42a371/download/report2015el.pdf).
Τα δεδομένα για τον καιρό αντλούνται από το [Open Weather API](https://openweathermap.org/api).

## Υλοποίηση:

- Βάση Δεδόμενων: PostgreSQL
- Backend: API endpoints μέσω NodeJS (με διάφορα frameworks)
- Frontend: HTML/CSS/JavaScript στο οποίο θα δίνεται η τοποθεσία από τον χρήστη και θα εμφανίζονται παραλίες κοντά του