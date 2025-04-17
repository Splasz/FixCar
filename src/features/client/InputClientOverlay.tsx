import Overlay from "../../components/Overlay";
import React, { useState } from "react";
import { Textarea } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import supabase from "../../api/supabaseClient";

type InputClientOverlay = {
  isOpen: boolean;
  onClose: () => void;
};

function InputClientOverlay({ isOpen, onClose }: InputClientOverlay) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    text: "",
    carBrand: "",
    carModel: "",
    productionYear: "",
    registrationNumber: "",
    vin: "",
    mileage: "",
    engineType: "",
    engineCapacity: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      lastname: "",
      phone: "",
      email: "",
      text: "",
      carBrand: "",
      carModel: "",
      productionYear: "",
      registrationNumber: "",
      vin: "",
      mileage: "",
      engineType: "",
      engineCapacity: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.lastname.trim() ||
      !formData.carBrand.trim() ||
      !formData.carModel.trim()
    ) {
      return;
    }

    const insertClient = async (): Promise<string | null> => {
      const { data, error } = await supabase
        .from("Klienci")
        .insert([
          {
            imie: formData.name,
            nazwisko: formData.lastname,
            telefon: formData.phone,
            email: formData.email,
            notatki: formData.text,
          },
        ])
        .select("Klient_id");

      if (error) {
        console.error("Bład przy wysylaniu(client):", error);
        return null;
      } else if (data && data.length > 0) {
        const clientId = data[0].Klient_id;
        console.log("Id dodanego klienta: ", clientId);
        return clientId;
      } else {
        console.warn("Brak danych po insercie klienta");
        return null;
      }
    };

    const insertCar = async (klientId: string) => {
      const { data, error } = await supabase
        .from("Pojazdy")
        .insert([
          {
            Klient_id: klientId,
            marka: formData.carBrand,
            model: formData.carModel,
            rok_produkcji: formData.productionYear,
            nr_rejestracyjny: formData.registrationNumber,
            vin: formData.vin,
            przebieg: formData.mileage,
            rodzaj_silnika: formData.engineType,
            pojemnosc_silnika: formData.engineCapacity,
          },
        ])
        .select();

      if (error) {
        console.error("Bład przy wysylaniu(car):", error);
      } else {
        console.log(data);
      }
    };

    const newClientId = await insertClient();
    if (newClientId) {
      await insertCar(newClientId);
    }
    setSuccessMessage("Pomyślnie dodano nowego klienta i samochód!");
    resetForm();
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-5.5">
        <div className="flex flex-col gap-2.5">
          <div className="border-b-1 border-highlight text-2xl">
            Dodaj Nowego Klienta
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex gap-3.5">
              <label className="flex flex-col">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Imię
                </span>
                <input
                  placeholder="Jan"
                  name="name"
                  type="text"
                  className="client peer"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <p className="mt-1 hidden text-xs text-accent peer-invalid:block">
                  Imię jest wymagane
                </p>
              </label>

              <label className="flex flex-col">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Nazwisko
                </span>
                <input
                  placeholder="Kowalski"
                  name="lastname"
                  type="text"
                  className="client peer"
                  required
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <p className="mt-1 hidden text-xs text-accent peer-invalid:block">
                  Nazwisko jest wymagane
                </p>
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                Telefon
                <input
                  placeholder="+48"
                  maxLength={9}
                  name="phone"
                  type="text"
                  className="client w-1/2"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                E-mail
                <input
                  placeholder="example@email.com"
                  type="email"
                  name="email"
                  className="client w-1/2"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                Notatka
                <Textarea
                  placeholder="..."
                  className="client_note h-24"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex items-center gap-2.5 text-xl p-2 rounded-2xl text-background bg-primary w-1/3 cursor-pointer"
              >
                <FaCheck />
                Dodaj
              </button>
            </div>

            {successMessage && (
              <div>
                <p className="text-accent2">{successMessage}</p>
              </div>
            )}
          </form>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="border-b-1 border-highlight text-2xl">
            Dodaj Samochód
          </div>

          <form className="flex flex-col gap-5">
            <div className="flex gap-3.5">
              <label className="flex flex-col">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Marka
                </span>
                <input
                  placeholder="Toyota"
                  name="carBrand"
                  type="text"
                  className="client peer"
                  required
                  value={formData.carBrand}
                  onChange={handleChange}
                />
                <p className="mt-1 hidden text-xs text-accent peer-invalid:block">
                  Marka jest wymagana
                </p>
              </label>

              <label className="flex flex-col">
                <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  Model
                </span>
                <input
                  placeholder="Corolla"
                  name="carModel"
                  type="text"
                  className="client peer"
                  required
                  value={formData.carModel}
                  onChange={handleChange}
                />
                <p className="mt-1 hidden text-xs text-accent peer-invalid:block">
                  Model jest wymagany
                </p>
              </label>
            </div>

            <div className="flex gap-3.5">
              <label className="flex flex-col">
                Rok Produkcji
                <input
                  placeholder="2010"
                  name="productionYear"
                  type="text"
                  className="client peer"
                  value={formData.productionYear}
                  onChange={handleChange}
                />
              </label>

              <label className="flex flex-col">
                Przebieg
                <input
                  placeholder="150000"
                  name="mileage"
                  type="text"
                  className="client peer"
                  value={formData.mileage}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="flex gap-3.5">
              <label className="flex flex-col">
                VIN
                <input
                  placeholder="1HGCM82633A123456"
                  name="vin"
                  type="text"
                  className="client uppercase"
                  maxLength={17}
                  value={formData.vin}
                  onChange={handleChange}
                />
              </label>

              <label className="flex flex-col">
                Nr Rejestracyjny
                <input
                  placeholder="WW1234X"
                  name="registrationNumber"
                  type="text"
                  className="client uppercase"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="flex gap-3.5">
              <label className="flex flex-col w-full">
                Typ silnika
                <select
                  name="engineType"
                  className="client"
                  value={formData.engineType}
                  onChange={handleChange}
                >
                  <option value="Benzyna">Benzyna</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elektryk">Elektryk</option>
                  <option value="Hybryda">Hybryda</option>
                </select>
              </label>

              <label className="flex flex-col">
                Pojemność
                <input
                  placeholder={
                    formData.engineType === "Elektryk"
                      ? "Masz napęd elektryczny"
                      : "1.6"
                  }
                  name="engineCapacity"
                  type="text"
                  className="client"
                  value={formData.engineCapacity}
                  onChange={handleChange}
                  disabled={formData.engineType === "Elektryk"}
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
}

export default InputClientOverlay;
