import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "../../router";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Halaman gagal dimuat:", error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="w-full min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-xl rounded-3xl bg-white border border-emerald-900/10 shadow-xl shadow-emerald-950/5 p-8 sm:p-10 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-emerald-950">
              Halaman gagal dimuat
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Terjadi kendala saat menampilkan bagian ini. Coba muat ulang halaman, atau kembali ke
              beranda untuk melanjutkan belajar bersama Rimba.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={this.handleReload}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Muat Ulang
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-black text-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
