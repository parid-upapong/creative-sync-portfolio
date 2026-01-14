graph TD
    User((User)) --> WebApp[Next.js Frontend]
    WebApp --> API[API Gateway / NestJS]
    
    subgraph "Processing Layer"
        API --> Redis[(Redis Queue)]
        Redis --> Worker[Site Generation Worker]
        Worker --> Vision[AI Vision Service]
        Worker --> LLM[LLM Context Engine]
    end

    subgraph "Storage & Content"
        Vision --> Assets[(S3 / Cloudinary)]
        Worker --> DB[(PostgreSQL / Supabase)]
        LLM --> VectorDB[(Vector Store - Styles)]
    end

    subgraph "Delivery Layer"
        Worker --> Vercel[Vercel Deploy API]
        Vercel --> Edge[Edge Network / Custom Domains]
    end

    Edge --> User