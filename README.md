# FinanceHub

Aplikacja do zarządzania finansami domowymi.

## Technologie
- Backend: C# / ASP.NET Core 9
- Frontend: React + Vite + TailwindCSS
- Baza danych: PostgreSQL 16 (Docker)

## Autor
Jan Skrzat

## Jak uruchomić lokalnie

### Wymagania
- Docker
- .NET 9
- Node.js

### Baza danych
```bash
docker start financehub-db
```

### Backend
```bash
cd FinanceHub.API
dotnet run
```

### Frontend
```bash
cd financehub-client
npm run dev
```

## Co działa
### Sprint 1
- Rejestracja użytkownika (bcrypt + JWT)
- Logowanie użytkownika
- Strona Login i Register
- Dashboard z wylogowaniem

### Sprint 2
- Kategorie i podkategorie
- Transakcje (wydatki i przychody)
- Filtrowanie transakcji
- Axios interceptor (JWT auto-header)

### Sprint 3
- Konta finansowe (CRUD)
- Transfery między kontami (atomowe)
- Integracja NBP API (kursy walut)
- Net Worth na dashboardzie

## Status
🚧 Sprint 4 w budowie