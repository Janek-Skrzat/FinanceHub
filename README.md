# FinanceHub

Aplikacja do zarządzania finansami domowymi.

## Technologie
- Backend: C# / ASP.NET Core 9
- Frontend: React + Vite + TailwindCSS
- Baza danych: PostgreSQL 16 (Docker)

## Autor
Jan Skrzat

## Jak uruchomić lokalnie

### Opcja A — Docker Compose
```bash
docker-compose up --build
```
Aplikacja dostępna na http://localhost:5173

### Opcja B — Ręcznie
#### Wymagania
- Docker
- .NET 9
- Node.js

#### Baza danych
```bash
docker start financehub-db
```

#### Backend
```bash
cd FinanceHub.API
dotnet run
```

#### Frontend
```bash
cd financehub-client
npm run dev
```

## Co działa
### Sprint 1
- Rejestracja użytkownika (bcrypt + JWT)
- Logowanie użytkownika
- Strona Login i Register

### Sprint 2
- Kategorie i podkategorie
- Transakcje z filtrowaniem i wyszukiwaniem
- Eksport transakcji do CSV

### Sprint 3
- Konta finansowe (CRUD)
- Transfery między kontami (atomowe)
- Integracja NBP API (kursy walut)
- Net Worth na dashboardzie

### Sprint 4
- Cele oszczędnościowe z paskiem postępu
- Zobowiązania kredytowe
- Wykresy interaktywne (Recharts)
- Profesjonalne UI (dark/light mode, sidebar)
- Security fixes (rate limiting, CSV injection)

### Sprint 5
- Toast notifications
- Usuwanie z potwierdzeniem (ConfirmModal)
- Edycja kont inline
- Loading states
- Dark mode w localStorage

### Sprint 6
- Swagger/OpenAPI (/swagger)
- Docker Compose
- Dockerfile backend + frontend

## Status
✅ Aplikacja ukończona — gotowa do deploymentu na VPS