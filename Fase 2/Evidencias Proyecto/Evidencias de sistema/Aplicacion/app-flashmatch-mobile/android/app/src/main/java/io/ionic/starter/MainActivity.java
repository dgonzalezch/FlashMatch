package io.ionic.starter;

import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        // Obtener los datos del deep link
        Uri data = intent.getData();

        if (data != null) {
            String path = data.getPath();
            // Verificar si el path coincide con '/voucher'
            if ("/voucher".equals(path)) {
                // Redirigir directamente a la ruta '/private/voucher' en la app
                redirectToVoucher();
            }
        }
    }

    // Método para redirigir a la ruta '/private/voucher' dentro de la app
    private void redirectToVoucher() {
        // Usar 'this.bridge' para acceder a la WebView
        if (this.bridge != null) {
            this.bridge.getWebView().loadUrl("http://localhost/private/voucher");
        }
    }
}
